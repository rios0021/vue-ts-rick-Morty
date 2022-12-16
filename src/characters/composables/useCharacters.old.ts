import { ref, onMounted } from 'vue';
import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Result, Character } from '../interfaces/character';
import axios from 'axios';

const characters = ref<Result[]>([]);
const isLoading = ref<boolean>(true);
const hasError = ref<boolean>(false);
const errorMessage = ref<string|undefined>(undefined);

export const useCharactersOld = () => {
    
    onMounted(async() => {
        await loadCharacters();
    });

    const loadCharacters = async() => {
        if(characters.value.length > 0 ) return;
        
        isLoading.value = true;
        try {
            const {data} = await rickAndMortyApi.get<Character>('/character')
            characters.value = data.results;
            isLoading.value = false;
        } catch (error) {
            isLoading.value = false;
            hasError.value = true;
            if(axios.isAxiosError(error)){
                return errorMessage.value = error.message;
            }
            errorMessage.value = JSON.stringify(error);
        }
            
    }

    return {
        characters,
        isLoading,
        hasError,
        errorMessage
    }
}