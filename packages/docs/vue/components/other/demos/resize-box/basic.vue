<template>
  <div>
    <ResizeBox
      :directions="['right', 'bottom']"
      :style="{
        width: '500px',
        minWidth: '100px',
        maxWidth: '100%',
        height: '200px',
        textAlign: 'center',
      }"
    >
      <TypographyParagraph
        >We are building the future of content discovery and
        creation.</TypographyParagraph
      >
      <Divider />
      <TypographyParagraph>
        ByteDance's content platforms enable people to enjoy content powered by
        AI technology. We inform, entertain, and inspire people across language,
        culture and geography.
      </TypographyParagraph>
      <Divider>ByteDance</Divider>
      <TypographyParagraph
        >Yiming Zhang is the founder and CEO of
        ByteDance.</TypographyParagraph
      >
    </ResizeBox>
  </div>
</template>