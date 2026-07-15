<template>
  <Dropdown>
    <Button>Click Me</Button>
    <template #content>
      <Doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 1</template>
      </Doption>
      <Doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 2</template>
      </Doption>
      <Doption>
        <template #icon>
          <icon-location />
        </template>
        <template #default>Option 3</template>
      </Doption>
    </template>
  </Dropdown>
</template>