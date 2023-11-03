<!-- TODO -->
<script>
import logger from '@/logger'

export function openModal(modalId) {
  logger.trace(modalId)
  const $targetEl = document.getElementById(modalId)
  const options = {
    backdrop: 'static',
  }
  const modal = new Modal($targetEl, options)
  modal.show()
  return modal
}
</script>
