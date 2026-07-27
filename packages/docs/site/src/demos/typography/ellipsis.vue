<template>
  <div>
    <TypographyTitle :heading="4" ellipsis>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process.
    </TypographyTitle>
    <TypographyParagraph
      :ellipsis="{
        rows: 2,
        showTooltip: true,
      }"
    >
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      The verb to design expresses the process of developing a design.A design
      is a plan or specification for the construction of an object or system or
      for the implementation of an activity or process, or the result of that
      plan or specification in the form of a prototype, product or process. The
      verb to design expresses the process of developing a design. The verb to
      design expresses the process of developing a design.
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        rows: 2,
        showTooltip: true,
        css: true,
      }"
    >
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      The verb to design expresses the process of developing a design.A design
      is a plan or specification for the construction of an object or system or
      for the implementation of an activity or process, or the result of that
      plan or specification in the form of a prototype, product or process. The
      verb to design expresses the process of developing a design. The verb to
      design expresses the process of developing a design.
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        suffix: '--Arco Design',
        rows: 2,
        expandable: true,
        showTooltip: {
          type: 'popover',
          props: {
            style: { maxWidth: `500px` },
          },
        },
      }"
    >
      <template #expand-node="{ expanded }">
        {{ expanded ? '' : 'More' }}
      </template>
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      The verb to design expresses the process of developing a design.A design
      is a plan or specification for the construction of an object or system or
      for the implementation of an activity or process, or the result of that
      plan or specification in the form of a prototype, product or process. The
      verb to design expresses the process of developing a design. The verb to
      design expresses the process of developing a design.
    </TypographyParagraph>
    <TypographyParagraph
      :ellipsis="{
        suffix: '--Arco Design',
        rows: 3,
        expandable: true,
      }"
    >
      A design is a plan or specification for the construction of an object or
      system or for the implementation of an activity or process, or the result
      of that plan or specification in the form of a prototype, product or
      process. The verb to design expresses the process of developing a design.
      The verb to design expresses the process of developing a design. A design
      is a plan or specification for the construction of an object or system or
      for the implementation of an activity or process, or the result of that
      plan or specification in the form of a prototype, product or process. The
      verb to design expresses the process of developing a design. The verb to
      design expresses the process of developing a design.
    </TypographyParagraph>
  </div>
</template>
