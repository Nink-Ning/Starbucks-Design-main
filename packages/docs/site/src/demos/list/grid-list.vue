<template>
  <List :gridProps="{ gutter: 0, span: 6 }" :bordered="false">
    <ListItem>
      <List>
        <template #header>Platform</template>
        <ListItem>iOS</ListItem>
        <ListItem>Android</ListItem>
        <ListItem>Web</ListItem>
      </List>
    </ListItem>
    <ListItem>
      <List>
        <template #header>Framework</template>
        <ListItem>Angular</ListItem>
        <ListItem>Vue</ListItem>
        <ListItem>React</ListItem>
      </List>
    </ListItem>
    <ListItem>
      <List>
        <template #header>Language</template>
        <ListItem>C++</ListItem>
        <ListItem>JavaScript</ListItem>
        <ListItem>Python</ListItem>
      </List>
    </ListItem>
    <ListItem>
      <List>
        <template #header>Component</template>
        <ListItem>Button</ListItem>
        <ListItem>Breadcrumb</ListItem>
        <ListItem>Transfer</ListItem>
      </List>
    </ListItem>
  </List>
</template>
