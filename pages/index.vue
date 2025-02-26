<template>
  <h1>タスク一覧</h1>
  <ul>
    <li v-for="task in taskList" :key="task.id">
      <NuxtLink v-bind:to="{ name: 'task-id', params: { id: task.id } }">{{
        task.title
      }}</NuxtLink>
    </li>
  </ul>

  <NuxtLink v-bind:to="{ name: 'task-taskRegister' }"
    >タスク登録画面に遷移</NuxtLink
  >
</template>
<script setup lang="ts">
import type Task from '~/interfaces/task';

const taskList = ref<Array<Task>>([]);
onMounted(async () => {
  try {
    const response: Array<Task> = await $fetch('api/getTasks');
    taskList.value = response;
    console.log(taskList);
  } catch (e) {
    console.error(e);
  }
});
</script>
