import rickAndMortyApi from '@/api/rickAndMortyApi';
import type { Character, Result } from '@/characters/interfaces/character';
import { reactive } from 'vue';
import axios from 'axios';
interface Store{
    characters:{
        list:Result[],
        count: number,
        isLoading: boolean,
        hasError: boolean,
        errorMessage: string | null
    },

    ids: {
        list: {
            [id:string]: Result
        },
        isLoading: boolean,
        hasError: boolean,
        errorMessage: string | null,
    }
    // Methods
    startLoadingCharacters: () => void,
    loadedCharacters: (data: Result[]) => void,
    loadCharactersFailed: (error: string) => void

    // Methods by id
    startLoadingCharacter: () => void,
    loadedCharacter: (character: Result) => void,
    checkIdInStore: (id: string) =>  boolean
}

// Initial State
const characterStore = reactive<Store>({
    characters:{
        count:0,
        errorMessage: null,
        hasError: false,
        isLoading: true,
        list: []
    },

    ids:{
        list: {},
        isLoading: false,
        hasError: false,
        errorMessage: null
    },

    startLoadingCharacters: async() => {
        const {data} = await rickAndMortyApi.get<Character>('/character');
        try {
            characterStore.loadedCharacters(data.results)
        } catch (error) {
            if (axios.isAxiosError(error)){
                characterStore.loadCharactersFailed(error.message)
            }
        }
    },
    loadedCharacters: (data)=>{
        characterStore.characters = {
            count: data.length,
            errorMessage: null,
            hasError: false,
            isLoading: false,
            list: data 
        }
    },
    loadCharactersFailed: (error) => {
        characterStore.characters ={
            count:0,
            errorMessage: error,
            hasError: true,
            isLoading: false,
            list: []
        }
    },
    startLoadingCharacter: () => {
        characterStore.ids = {
            ...characterStore.ids,
            isLoading: true,
            hasError: false,
            errorMessage: null
        }
    },
    checkIdInStore: (id: string) =>  {
        if(characterStore.ids.list[id] === undefined){
            return false
        }else{
            return true
        }
    },
    loadedCharacter: (character: Result) => {
        characterStore.ids.isLoading = false;
        characterStore.ids.list[character.id] = character;  
    }

    
});

characterStore.startLoadingCharacters();

export default characterStore;