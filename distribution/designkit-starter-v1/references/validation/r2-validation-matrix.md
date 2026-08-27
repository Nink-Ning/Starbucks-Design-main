# Starter V1-r2 Candidate Validation Matrix

This filtered matrix records candidate evidence independently. `PASS` in one dimension never promotes another dimension. `CONDITIONAL` means an explicit dependency or manual sign-off remains.

| Capability / Template | Decision | Template Usage | Provenance | Interaction | Theme | Responsive | Geometry | Accessibility | Visual | Candidate Ready |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Basic List | PASS | PASS | PASS when Runtime DOM evidence is present | PASS within Search + Refresh boundary | CONDITIONAL | CONDITIONAL | CONDITIONAL (universal list spacing unresolved) | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Card List | PASS | PASS | PASS with Runtime bindings | PASS | PASS for generated Runtime theme | PASS at tested viewports | PASS for Golden relationships | CONDITIONAL | CONDITIONAL pending manual sign-off | CONDITIONAL |
| Basic Form Create | PASS | PASS | PASS with Runtime form controls | PASS | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Basic Form Edit | PASS | PASS same family | PASS with Runtime form controls | PASS prefill/Save/Cancel | CONDITIONAL | PASS at tested viewports | PASS same family anatomy | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Basic Detail | PASS | PASS focused read-only | PASS with approved bindings | PASS | CONDITIONAL | CONDITIONAL | CONDITIONAL | CONDITIONAL known DetailPageHeader dependency | CONDITIONAL | CONDITIONAL |
| TableToolbar | PASS | PASS within template subset | PASS direct export/CSS/DOM | PASS | CONDITIONAL | CONDITIONAL | NOT_APPLICABLE | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Quick Filter | PASS | PASS | PASS through TableToolbar | PASS ordering pattern | CONDITIONAL | CONDITIONAL | NOT_APPLICABLE | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Selection / Batch Actions | PASS only Card List scope | PASS | PASS Runtime Checkbox/TableToolbar | PASS shared page-owned set | CONDITIONAL | CONDITIONAL | PASS anchored relationship | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Theme / Responsive / Accessibility | PASS as contracts | Template-specific | Runtime evidence required | Browser evidence required | CONDITIONAL | CONDITIONAL | Template-specific | CONDITIONAL | CONDITIONAL | CONDITIONAL |
| Navigation / Export / Result / Dashboard | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE | OUT OF SCOPE |

## Evidence rules

- Runtime provenance requires package-local runtime resources, approved exports and rendered DOM evidence.
- Geometry requires same-viewport Golden/generated measurements; it is not a universal pixel-perfect test.
- Interaction requires actual browser interaction; Responsive requires real viewport evidence.
- Visual Fidelity requires screenshots plus a manual review record. No automated result may claim Visual PASS.
- Card List Error/Retry may be proven by a validation fixture; a new Golden state is not required.
- Raw Card List Golden Dark comparison is unavailable; Theme evidence and Dark Golden visual evidence remain separate.
