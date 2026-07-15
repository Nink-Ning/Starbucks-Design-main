<template>
  <Anchor :offset-top="60" :style="{ backgroundColor: 'var(--color-bg-2)' }">
    <AnchorLink href="#basic">Basic</AnchorLink>
    <AnchorLink href="#line-less">LineLess Mode</AnchorLink>
    <AnchorLink href="#affix">
      Affix
      <template #sublist>
        <AnchorLink href="#boundary">Scroll Boundary</AnchorLink>
        <AnchorLink href="#hash">Hash mode</AnchorLink>
      </template>
    </AnchorLink>
  </Anchor>
</template>