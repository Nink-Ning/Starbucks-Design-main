# Resolution Note: TableToolbar Runtime Evidence

`selectedBusinessExports` is **removed as a Starter validation requirement** in V1-r2. The Runtime Manifest does not define that field; the package must not invent it or change the Runtime schema to satisfy historical checks.

## Canonical evidence

For `starter.component.table-toolbar`, use all of the following implementation-side evidence:

1. `typeof StarbucksReact.TableToolbar === 'function'`;
2. `.sbux-table-toolbar` in the package Runtime CSS;
3. fixed Runtime resources loaded in the documented order;
4. a Starter-compatible page rendering the Runtime-backed toolbar in its approved template boundary.

The frozen R1 archive may retain the historical conflict wording. That is expected pre-projection drift and is not a reason to modify R1. R2 validation and the R2 checklist use this resolution note instead.

## Ownership

Knowledge/Validation owns the assertion; Runtime owns the actual export and CSS. A future Runtime schema change would require a separate authorized task and is not part of this projection.
