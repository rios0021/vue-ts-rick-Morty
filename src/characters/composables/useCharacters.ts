import { ref } from 'vue';
import { useQuery } from '@tanstack/vue-query';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, Result } from '@/characters/interfaces/character';
import axios from 'axios';
import { computed } from 'vue';

const characters = ref<Result[]>([]);
const hasError   = ref<boolean>(false);
const errorMessage = ref<string|null>(null);

const getCharacters = async():Promise<Result[]> => {
    if (characters.value.length > 0){
        return characters.value; 
    }
    const {data} = await rickAndMortyApi.get<Character>('/character');
    return data.results
}

const loadedCharacters = (data:Result[]) => {
    hasError.value = false;
    errorMessage.value = null;
    characters.value = data;
}

const useCharacters = () => {
    
    const {isLoading, } =useQuery(
        ['characters'], 
        getCharacters,
        {
            // onSuccess(data){
            //     loadedCharacters(data);
            // },
            onSuccess:loadedCharacters,
            // onError(error){
            //     if (axios.isAxiosError(error)){
            //         characterStore.loadCharactersFailed(error.message)
            //     }
            // }
        }
    );
    
    return{
        // Properties
        characters,
        isLoading,
        hasError,
        errorMessage,
        // Getters
        count: computed(() => characters.value.length),

        // Methods
    }
}


export default useCharacters;