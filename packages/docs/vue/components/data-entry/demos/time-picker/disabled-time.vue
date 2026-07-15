<template>
  <TimePicker
    style="width: 194px; margin: 0 24px 24px 0;"
    :disabledHours="() => [1, 2, 4, 14]"
    :disabledMinutes="() => [1, 2, 3, 4, 14, 15, 16, 20, 50]"
    :disabledSeconds="() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]"
  />
  <TimePicker
    type="time-range"
    style="width: 252px; margin: 0 24px 24px 0;"
    :disabledHours="() => [1, 2, 4, 14]"
    :disabledMinutes="() => [1, 2, 3, 4, 14, 15, 16, 20, 50]"
    :disabledSeconds="() => [1, 2, 3, 4, 5, 6, 7, 10, 14, 60]"
  />
</template>