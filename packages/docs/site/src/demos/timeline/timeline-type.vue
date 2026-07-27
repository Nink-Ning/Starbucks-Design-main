<template>
  <Row justify="space-between">
    <Timeline mode="alternate" :style="{ flex: 1 }">
      <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
      <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
      <TimelineItem label="2020-09-30" position="bottom">
        The third milestone
      </TimelineItem>
    </Timeline>
    <Timeline mode="right" :style="{ flex: 1 }">
      <TimelineItem label="2017-03-10">The first milestone</TimelineItem>
      <TimelineItem label="2018-05-12">The second milestone</TimelineItem>
      <TimelineItem label="2020-09-30" position="bottom">
        The third milestone
      </TimelineItem>
    </Timeline>
  </Row>
</template>
