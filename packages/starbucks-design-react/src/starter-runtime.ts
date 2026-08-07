// Starter-only runtime entry.
// Keep the visual CSS imports explicit so the dedicated UMD build can emit
// one standalone stylesheet without changing the public package entry.
import './components.less'
import './theme.css'
import './pro/form-layout/style.less'
import './pro/detail-layout/style.less'
// Keep ReactDOM in the Starter UMD external contract; list.html loads it before this file.
import 'react-dom'

// Reuse the public React entry's exports without adding this file to package exports.
export * from './index'

// Selective Pro exports required by the React Basic Form and Basic Detail
// templates. Do not re-export the full Pro entry: that would pull unrelated
// Page, Card Detail, Data Detail, Secondary Detail, and Step Form capabilities
// into the Starter runtime.
export { FormPageLayout } from './pro/form-layout/FormPageLayout'
export { FormGrid, FormGridItem } from './pro/form-layout/FormGrid'
export { FormControlArea } from './pro/form-layout/FormControlArea'
export { FormActions } from './pro/form-layout/FormActions'
export { DetailPageLayout, DetailSection, DetailDescriptions } from './pro/detail-layout'
