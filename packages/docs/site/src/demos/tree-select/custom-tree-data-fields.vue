<template>
  <TreeSelect
    default-value="0-0-1"
    :fieldNames="{
      key: 'value',
      title: 'label',
      children: 'items',
    }"
    :data="treeData"
    placeholder="Please select ..."
    style="width: 300px;"
  ></TreeSelect>
</template>
<script setup lang="ts">
const treeData = [
  {
    label: 'Trunk 0-0',
    value: '0-0',
    items: [
      {
        label: 'Branch 0-0-2',
        value: '0-0-2',
        selectable: false,
        items: [
          {
            label: 'Leaf',
            value: '0-0-2-1',
            items: [
              {
                label: 'Leaf 0-0-2',
                value: '0-0-2-1-0',
                items: [
                  {
                    label: 'Leaf',
                    value: '0-0-2-1-0-0',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    label: 'Trunk 0-1',
    value: '0-1',
    items: [
      {
        label: 'Branch 0-1-1',
        value: '0-1-1',
        items: [
          {
            label: 'Leaf',
            value: '0-1-1-0',
          },
        ],
      },
    ],
  },
];
</script>
