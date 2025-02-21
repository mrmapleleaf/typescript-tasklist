<template>
  <h1>タスク登録画面</h1>
  <div class="form-section">
    <form @submit.prevent="">
      <div>
        <label for="title">タイトル</label>：
        <input type="text" />
      </div>
      <div>
        <label for="description">詳細</label>：
        <input type="text" />
      </div>
      <div>
        <label for="status">ステータス</label>：
        <input type="" />
      </div>
      <div>
        <label for="deadline">締切</label>：
        <input type="" />
      </div>
      <button type="submit">登録</button>
    </form>
  </div>
</template>

<script setup lang="ts"></script>
