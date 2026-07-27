<template>
  <div>
    <TypographyParagraph>Default</TypographyParagraph>
    <Anchor :affix="false" direction="horizontal">
      <AnchorLink href="#basic">Basic</AnchorLink>
      <AnchorLink href="#static">Static</AnchorLink>
      <AnchorLink href="#line-less">LineLess Mode</AnchorLink>
      <AnchorLink href="#affix">Affix</AnchorLink>
      <AnchorLink href="#boundary">Scroll Boundary</AnchorLink>
      <AnchorLink href="#hash">Hash mode</AnchorLink>
    </Anchor>

    <TypographyParagraph :style="{ marginTop: '32px' }">
      LineLess mode
    </TypographyParagraph>
    <Anchor :affix="false" direction="horizontal" line-less>
      <AnchorLink href="#basic">Basic</AnchorLink>
      <AnchorLink href="#static">Static</AnchorLink>
      <AnchorLink href="#line-less">LineLess Mode</AnchorLink>
      <AnchorLink href="#affix">Affix</AnchorLink>
      <AnchorLink href="#boundary">Scroll Boundary</AnchorLink>
      <AnchorLink href="#hash">Hash mode</AnchorLink>
    </Anchor>
  </div>
</template>
