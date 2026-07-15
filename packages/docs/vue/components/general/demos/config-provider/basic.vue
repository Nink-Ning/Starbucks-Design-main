<template>
  <ConfigProvider :locale="locale">
    <RadioGroup
      type="button"
      v-model="localeType"
      :options="localeOptions"
    ></RadioGroup>
    <div>
      <Pagination
        :total="50"
        show-total
        show-jumper
        show-page-size
        style="margin-top: 20px; margin-bottom: 20px;"
      />
    </div>
    <Space :size="20" style="margin-bottom: 20px;">
      <RangePicker style="width: 300px;" />
      <TimePicker type="time-range" style="width: 300px;" />
      <Popconfirm content="Are you sure you want to delete?">
        <Button type="primary">Popconfirm</Button>
      </Popconfirm>
    </Space>
  </ConfigProvider>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import zhCN from '@arco-design/web-vue/es/locale/lang/zh-cn';
import enUS from '@arco-design/web-vue/es/locale/lang/en-us';
import esES from '@arco-design/web-vue/es/locale/lang/es-es';
import jaJP from '@arco-design/web-vue/es/locale/lang/ja-jp';
import idID from '@arco-design/web-vue/es/locale/lang/id-id';
import frFR from '@arco-design/web-vue/es/locale/lang/fr-fr';
import ptPT from '@arco-design/web-vue/es/locale/lang/pt-pt';
import deDE from '@arco-design/web-vue/es/locale/lang/de-de';
import koKR from '@arco-design/web-vue/es/locale/lang/ko-kr';
import itIT from '@arco-design/web-vue/es/locale/lang/it-it';
import thTH from '@arco-design/web-vue/es/locale/lang/th-th';
import viVN from '@arco-design/web-vue/es/locale/lang/vi-vn';
import nlNL from '@arco-design/web-vue/es/locale/lang/nl-nl';

const locales = {
  'zh-CN': zhCN,
  'en-US': enUS,
  'es-ES': esES,
  'ja-JP': jaJP,
  'id-ID': idID,
  'fr-FR': frFR,
  'pt-PT': ptPT,
  'de-DE': deDE,
  'ko-KR': koKR,
  'it-IT': itIT,
  'th-TH': thTH,
  'vi-VN': viVN,
  'nl-NL': nlNL,
};

const localeType = ref('es-ES');
const locale = computed(() => {
  return locales[localeType.value] || zhCN;
});
const localeOptions = Object.keys(locales);
</script>