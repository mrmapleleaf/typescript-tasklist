<template>
  <h1>タスクの詳細画面です</h1>
  <template v-if="task">
    <p>{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p>{{ task.status }}</p>
    <p v-if="task.deadline">{{ task.deadline }}</p>
    <p v-else>締切なし</p>
  </template>
  <template v-else>
    <p>タスクが見つかりませんでした</p>
  </template>
</template>
<script lang="ts" setup>
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type Task from '~/interfaces/task';

const route = useRoute();
const id = route.params.id;
const tmp = ref<number>(0);
let task = ref<Task | null>(null);

onMounted(async () => {
  await getTaskDetails();
});

const getTaskDetails = async () => {
  try {
    const response: Array<Task> = await $fetch('/api/getTaskDetails', {
      params: { id: id },
    });
    task.value = response[0];
  } catch (e) {
    console.error(e);
  }
};
</script>
