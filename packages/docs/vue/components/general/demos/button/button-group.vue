<template>
  <Space direction="vertical">
    <ButtonGroup>
      <Button>Publish</Button>
      <Button>
        <template #icon>
          <icon-down />
        </template>
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button>Publish</Button>
      <Button>
        <template #icon>
          <icon-more />
        </template>
      </Button>
    </ButtonGroup>
    <ButtonGroup>
      <Button type="primary">
        <icon-left />
        Prev
      </Button>
      <Button type="primary">
        Next
        <icon-right />
      </Button>
    </ButtonGroup>
    <Space size="large">
      <ButtonGroup type="primary">
        <Button> copy </Button>
        <Button> cut </Button>
        <Button> find </Button>
      </ButtonGroup>
      <ButtonGroup type="primary" status="warning">
        <Button>
          <template #icon><icon-heart-fill /></template>
        </Button>
        <Button>
          <template #icon><icon-star-fill /></template>
        </Button>
        <Button>
          <template #icon><icon-thumb-up-fill /></template>
        </Button>
      </ButtonGroup>
      <ButtonGroup size="small" disabled>
        <Button> prev </Button>
        <Button> next </Button>
      </ButtonGroup>
    </Space>
  </Space>
</template>