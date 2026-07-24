<template>
  <div class="sb-upload-demo sb-upload-drop-upload">
    <Upload draggable multiple action="/" :show-file-list="false">
      <template #upload-button>
        <div class="sb-upload-drop-trigger" tabindex="0">
          <Link>点击上传</Link>
          <span>/ 拖拽到此区域</span>
        </div>
      </template>
    </Upload>
    <div class="sb-upload-tip">额外提示语，文字过多时宽度折行</div>
  </div>
</template>

<script setup lang="ts">
import './showcase.css';
</script>
