<template>
  <h1>タスクの詳細画面です</h1>
  <template v-if="task">
    <p>{{ task.title }}</p>
    <p>{{ task.description }}</p>
    <p>{{ convertedStatus }}</p>
    <p v-if="task.deadline">{{ convertedDeadline }}</p>
    <p v-else>締切なし</p>
  </template>
  <template v-else>
    <p>タスクが見つかりませんでした</p>
  </template>

  <NuxtLink v-bind:to="{ name: 'task-update-id' }">タスクを更新する</NuxtLink>
  <br />
  <NuxtLink v-bind:to="{ name: 'index' }">ホームに戻る</NuxtLink>
</template>
<script lang="ts" setup>
import dayjs from 'dayjs';
import { ref } from 'vue';
import { useRoute } from 'vue-router';
import type Task from '~/interfaces/task';
import { TaskEnum } from '~/interfaces/taskEnum';

const route = useRoute();
const id = route.params.id;
const task = ref<Task | null>(null);

const convertedDeadline = ref<string>('');
const convertedStatus = ref<string>('');

onMounted(async () => {
  await getTaskDetails();
  convertedDeadline.value = convertDeadline(task.value?.deadline);
  convertedStatus.value = convertStatus(
    task.value?.status as keyof typeof TaskEnum
  );
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

const convertDeadline = (deadline: string) => {
  if (deadline === '' || deadline === null) {
    return '';
  }

  // dayjsではdate型でUTCベースで日付管理をするが、formatメソッドを使うとJSTに変換される。
  // ここでは日本時間で日付を扱いたいため、9時間分減算する。
  const convertedDate = dayjs(deadline)
    .subtract(9, 'hour')
    .format('YYYY/MM/DD');
  console.log(convertedDate);
  return convertedDate;
};

const convertStatus = (status: keyof typeof TaskEnum): string => {
  return TaskEnum[status];
};
</script>
