<template>
  <Dropdown>
    <Button>Click Me</Button>
    <template #content>
      <Doption>Option 1</Doption>
      <Dsubmenu value="option-1">
        <template #default>Option 2</template>
        <template #content>
          <Doption>Option 2-1</Doption>
          <Dsubmenu value="option-2-2" trigger="hover">
            <template #default>Option 2-2</template>
            <template #content>
              <Doption>Option 2-1</Doption>
              <Doption>Option 2-2</Doption>
              <Doption>Option 2-3</Doption>
            </template>
            <template #footer>
              <div style="padding: 6px; text-align: center;">
                <Button>Click</Button>
              </div>
            </template>
          </Dsubmenu>
          <Doption>Option 2-3</Doption>
        </template>
      </Dsubmenu>
      <Doption>Option 3</Doption>
    </template>
  </Dropdown>
</template>