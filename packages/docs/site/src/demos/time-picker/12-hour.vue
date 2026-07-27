<template>
  <TimePicker
    use12Hours
    defaultValue="12:20:20 AM"
    format="hh:mm:ss A"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <TimePicker
    use12Hours
    defaultValue="09:20:20 pm"
    format="hh:mm:ss a"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <TimePicker
    use12Hours
    defaultValue="2:20 AM"
    format="h:mm A"
    style="width: 194px; margin: 0 24px 24px 0;"
  />
  <TimePicker
    type="time-range"
    use12Hours
    :defaultValue="['12:20:20 AM', '08:30:30 PM']"
    format="hh:mm:ss A"
    style="width: 300px; margin: 0 24px 24px 0;"
  />
</template>
