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

export function displayedUnitName(unit) {
  if (unit == 'hour') {
    return '時間 (h)'
  } else if (unit == 'minute') {
    return '時間 (min)'
  } else if (unit == 'count') {
    return '回数'
  } else if (unit == 'distance') {
    return '距離'
  }
}
</script>
