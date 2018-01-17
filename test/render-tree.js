import toHtml from 'snabbdom-to-html'
import { html as format } from 'js-beautify'

export default function render (tree) {
  return format(toHtml(tree))
}
