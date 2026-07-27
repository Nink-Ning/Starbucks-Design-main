<template>
  <div>
    <Split
      :style="{
        height: '200px',
        width: '100%',
        minWidth: '500px',
        border: '1px solid var(--color-border)',
      }"
    >
      <template #first>
        <TypographyParagraph>Left</TypographyParagraph>
      </template>
      <template #second>
        <div>
          <Split direction="vertical" :style="{ height: '200px' }">
            <template #first
              ><TypographyParagraph>Top</TypographyParagraph></template
            >
            <template #second
              ><TypographyParagraph>Bottom</TypographyParagraph></template
            >
          </Split>
        </div>
      </template>
    </Split>
  </div>
</template>
