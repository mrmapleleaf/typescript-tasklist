<template>
  <h1>タスク登録画面</h1>
  <div class="q-pa-md">
    <q-form
      @submit="onSubmit"
      @reset="onReset"
      class="q-gutter-md"
      ref="restaurantFrom"
    >
      <div class="q-gutter-md" style="max-width: 500px">
        <q-input
          v-model="title"
          label="タイトル"
          hint="※必須"
          lazy-rules
          :rules="[(value) => !!value || 'タイトルは必須です']"
        />
        <q-input v-model="description" label="詳細" type="textarea" />

        <q-input
          v-model="deadline"
          filled
          label="締切日"
          :rules="[() => validateDeadline || '締切に過去日は指定できません']"
        >
          <template v-slot:append>
            <q-icon name="event" class="cursor-pointer">
              <q-popup-proxy transition-show="scale" transition-hide="scale">
                <q-date v-model="deadline" />
              </q-popup-proxy>
            </q-icon>
          </template>
        </q-input>

        <q-select
          v-model="status"
          :options="options"
          label="ステータス"
          map-options
          emit-value
        />

        <q-btn color="primary" label="登録" @click="register" type="submit" />
        <q-btn color="primary" label="フォームをクリア" type="reset" />
      </div>
    </q-form>
  </div>
  <NuxtLink v-bind:to="{ name: 'index' }">ホームに戻る</NuxtLink>
</template>

<script setup lang="ts">
import { NuxtLink } from '#components';
import { TaskEnum } from '~/interfaces/taskEnum';
import dayjs from 'dayjs';
import options from '~/interfaces/options';

const title = ref<string>('');
const description = ref<string>('');
const deadline = ref<string>('');
const status = ref<string>(Object.keys(TaskEnum)[2]);

const onReset = () => {
  title.value = '';
  description.value = '';
  deadline.value = '';
  status.value = Object.keys(TaskEnum)[2];
};

const onSubmit = async () => {
  await register();
};

const validateDeadline = computed(() => {
  if (deadline.value === '' || deadline.value === null) {
    return true;
  }

  // dayjsで、日付のみの比較を行う。
  const currentDate = dayjs().startOf('day');
  const date = deadline.value.split('/');
  const selectedDate = dayjs(`${date[0]}-${date[1]}-${date[2]}`).startOf('day');

  if (selectedDate < currentDate) {
    return false;
  }
  return true;
});

const register = async () => {
  await $fetch('/api/createTask', {
    method: 'POST',
    body: {
      title: title.value,
      description: description.value,
      deadline: deadline.value,
      status: status.value,
    },
  });
};
</script>
