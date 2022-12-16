<script setup lang="ts">
import CardList from '@/characters/components/CardList.vue';
import useCharacters from '@/characters/composables/useCharacters';

const props = defineProps<{title:string, visible:boolean}>();

const {isLoading, hasError, errorMessage, characters, count} = useCharacters();



</script>

<template>
    <h1 v-if="isLoading">Loading...</h1>
    <div v-else-if="hasError">
        <h1>Error Loading</h1>
        <p>{{errorMessage}}</p>
    </div>
    <div v-else>
        <h2>{{props.title}} - {{count}}</h2>
        <CardList  :characters="characters" />
    </div>
</template>


<style scoped>

</style>