<template>
  <CheckboxGroup :default-value="['1']">
    <Checkbox value="1">
      <template #checkbox="{ checked }">
        <Tag :checked="checked" checkable>This is a tag checkbox 1</Tag>
      </template>
    </Checkbox>
    <Checkbox value="2">
      <template #checkbox="{ checked }">
        <Tag :checked="checked" checkable>This is a tag checkbox 2</Tag>
      </template>
    </Checkbox>
    <Checkbox value="3">
      <template #checkbox="{ checked }">
        <Tag :checked="checked" checkable>This is a tag checkbox 3</Tag>
      </template>
    </Checkbox>
  </CheckboxGroup>

  <div :style="{ marginTop: '20px' }">
    <CheckboxGroup :default-value="[1]">
      <template v-for="item in 2" :key="item">
        <Checkbox :value="item">
          <template #checkbox="{ checked }">
            <Space
              align="start"
              class="custom-checkbox-card"
              :class="{ 'custom-checkbox-card-checked': checked }"
            >
              <div className="custom-checkbox-card-mask">
                <div className="custom-checkbox-card-mask-dot" />
              </div>
              <div>
                <div className="custom-checkbox-card-title">
                  Checkbox Card {{ item }}
                </div>
                <TypographyText type="secondary">
                  this is a text
                </TypographyText>
              </div>
            </Space>
          </template>
        </Checkbox>
      </template>
    </CheckboxGroup>
  </div>
</template>

<style scoped>
.custom-checkbox-card {
  padding: 10px 16px;
  border: 1px solid var(--color-border-2);
  border-radius: 4px;
  width: 250px;
  box-sizing: border-box;
}

.custom-checkbox-card-mask {
  height: 14px;
  width: 14px;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 2px;
  border: 1px solid var(--color-border-2);
  box-sizing: border-box;
}

.custom-checkbox-card-mask-dot {
  width: 8px;
  height: 8px;
  border-radius: 2px;
}

.custom-checkbox-card-title {
  color: var(--color-text-1);
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.custom-checkbox-card:hover,
.custom-checkbox-card-checked,
.custom-checkbox-card:hover .custom-checkbox-card-mask,
.custom-checkbox-card-checked .custom-checkbox-card-mask {
  border-color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked {
  background-color: var(--color-primary-light-1);
}

.custom-checkbox-card:hover .custom-checkbox-card-title,
.custom-checkbox-card-checked .custom-checkbox-card-title {
  color: rgb(var(--primary-6));
}

.custom-checkbox-card-checked .custom-checkbox-card-mask-dot {
  background-color: rgb(var(--primary-6));
}
</style>