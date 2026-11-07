// After a failed submit: bring the first invalid field into view and focus it, so the inline
// error next to it is what the user reads first. Typeable fields win over picker (readonly) ones.
export function focusFirstInvalid(root: ParentNode = document) {
  const field =
    root.querySelector<HTMLElement>('.form-control.ion-invalid:not([readonly])') ??
    root.querySelector<HTMLElement>('.form-control.ion-invalid');
  if (!field) return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  field.scrollIntoView({ block: 'center', behavior: reduceMotion ? 'auto' : 'smooth' });
  if (!field.hasAttribute('readonly')) (field as any).setFocus?.();
}

// Enter submits from single-line inputs only; textareas keep Enter for new lines.
export function isSubmitEnter(event: Event) {
  const target = event.target as HTMLElement;
  if (target.closest('ion-textarea, textarea') || !target.closest('ion-input, input')) return false;
  event.preventDefault();
  return true;
}
