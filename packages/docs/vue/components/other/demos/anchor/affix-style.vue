<template>
  <Anchor :offset-bottom="40" :affix-style="affixStyle">
    <AnchorLink href="#basic">Basic</AnchorLink>
    <AnchorLink href="#static">Static</AnchorLink>
    <AnchorLink href="#line-less">LineLess Mode</AnchorLink>
    <AnchorLink href="#affix">Affix</AnchorLink>
    <AnchorLink href="#boundary">Scroll Boundary</AnchorLink>
    <AnchorLink href="#hash">Hash mode</AnchorLink>
  </Anchor>
</template>

<script setup lang="ts">
const affixStyle = {
  position: 'absolute',
  right: '-170px',
  top: '50%',
  zIndex: 1,
};
</script>