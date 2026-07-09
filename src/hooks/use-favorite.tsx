import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalStorage } from "./use-local-storage";

interface favoriteCity {
    id: string;
    // query: string;
    lat: number;
    lon: number;
    name: string;
    country: string;
    addedAt: number;
    state?: string;
}

export function useFavorite() {
    const [favorites, setFavorites] = useLocalStorage<favoriteCity[]>("favorites", []);

    const favoriteQuery = useQuery({
        queryKey: ["favorites"],
        queryFn: () => favorites,
        initialData: favorites,
        staleTime: Infinity,
    });

    const queryClient = useQueryClient();

    const addFavorite = useMutation({
        mutationFn: async (
            city: Omit<favoriteCity, "id" | "addedAt">
        ) => {
            const newFavorite: favoriteCity = {
                ...city,
                id: `${city.lat}-${city.lon}}`,
                addedAt: Date.now(),
            };

            const exists = favorites.some((fav) => fav.id === newFavorite.id);
            if(exists) return favorites;

            const newFavorites = [...favorites, newFavorite].slice(0, 10);

            setFavorites(newFavorites);
            return newFavorites;
        },

        onSuccess: () => {
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            });
        },
    });

    const removefavorite = useMutation({
        mutationFn: async (cityId: string) => {
            const newFavorites = favorites.filter((city) => city.id !== cityId);
            setFavorites(newFavorites);
            return newFavorites;
        },
        onSuccess: () =>{
            queryClient.invalidateQueries({
                queryKey: ["favorites"],
            })
        }
    });

    return {
        favorites: favoriteQuery.data,
        addFavorite,
        removefavorite,
        isFavorite:(lat:number, lon: number) => {
            return favorites.some((city) => city.lat === lat && city.lon === lon);
        }
    };
}