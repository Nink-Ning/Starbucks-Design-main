<template>
  <div class="sb-upload-demo sb-upload-flow-upload">
    <Upload
      action="/"
      :auto-upload="false"
      draggable
      multiple
      :limit="5"
      :show-file-list="false"
    >
      <template #upload-button>
        <div class="sb-upload-flow">
          <div class="sb-upload-flow-header">
            <Button type="outline">选择文件</Button>
            <span class="sb-upload-tip">{{ description }}</span>
          </div>
          <Table
            class="sb-upload-file-table"
            :columns="columns"
            :data="[]"
            :pagination="false"
          >
            <template #empty>
              <div class="sb-upload-table-empty">
                点击上方“选择文件”或将文件拖拽到此区域
              </div>
            </template>
          </Table>
          <div class="sb-upload-flow-actions">
            <Button type="secondary" @click.stop>取消上传</Button>
            <Button type="primary" disabled @click.stop>点击上传</Button>
          </div>
        </div>
      </template>
    </Upload>
  </div>
</template>

<script setup lang="ts">
import './showcase.css';

const description = '支持批量上传文件，文件格式不限，最多只能上传 5 份文件';
const columns = [
  { title: '文件名', dataIndex: 'name' },
  { title: '大小', dataIndex: 'size', width: 90 },
  { title: '状态', dataIndex: 'status' },
  { title: '操作', dataIndex: 'operation', width: 90 },
];
</script>
