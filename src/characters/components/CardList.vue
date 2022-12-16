<script setup lang="ts">
import CharacterCard from '@/characters/components/CharacterCard.vue';
import type { Result } from '@/characters/interfaces/character';
import { toRef } from 'vue';
// import rickAndMortyApi from '@/api/rickAndMortyApi';
// import { useQuery } from '@tanstack/vue-query';


// 1- Normal suspense
// const {data} = await rickAndMortyApi.get<Character>('/character');
// characters.value = data.results;

// 2- Composable functions
// import { useCharacters } from '../composables/useCharacters';
// const {characters, isLoading, hasError, errorMessage} = useCharacters();


// 3- Tanstack useQuery
// const getCharactersSlow = async():Promise<Character> => {
//     const {data} = await rickAndMortyApi.get<Character>('/character');
//     return data
// }
// const {isLoading, isError, data: characters, error} = useQuery(
//     ['characters'],
//     getCharactersSlow,
// )

const props = defineProps<{characters:Result[]}>();
const characters = toRef(props, 'characters');
</script>

<template>
    
    <div class="card-list">
        <CharacterCard 
            v-for="character of characters"
            :key="character.id"
            :character="character"
        />
    </div>
</template>


<style scoped>
.card-list{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
}
</style>