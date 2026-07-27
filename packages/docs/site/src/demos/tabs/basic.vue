<template>
  <Tabs default-active-key="2">
    <TabPane key="1" title="Tab 1"> Content of Tab Panel 1 </TabPane>
    <TabPane key="2" title="Tab 2"> Content of Tab Panel 2 </TabPane>
    <TabPane key="3">
      <template #title>Tab 3</template>
      Content of Tab Panel 3
    </TabPane>
  </Tabs>
</template>
