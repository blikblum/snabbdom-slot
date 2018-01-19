/* global describe, it, expect */

import { withSlot } from '../src/withslot'
import render from './render-tree'
import Snabbdom from 'snabbdom-pragma'

describe('when the component has no slot', () => {
  const NoSlot = withSlot(() => {
    return (
      <div>
        <div>No slot</div>
      </div>
    )
  })
  it('children is ignored', () => {
    const tree = (
      <NoSlot>
        <div>Child element</div>
      </NoSlot>
    )
    expect(render(tree)).toMatchSnapshot()
  })
})

describe('when the component has a main slot', () => {
  const MainSlot = withSlot(() => {
    return (
      <div>
        <slot>Default content</slot>
      </div>
    )
  })

  describe('and no children is passed', () => {
    it('should show default content', () => {
      const tree = (
        <MainSlot />
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and children is passed', () => {
    it('should show children content', () => {
      const tree = (
        <MainSlot>
          <h1>Child element</h1>
          <div>Other child element</div>
        </MainSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })
})

describe('when the component has a named slot', () => {
  const NamedSlot = withSlot(() => {
    return (
      <div>
        <slot name='myslot'>Default Content</slot>
      </div>
    )
  })

  describe('and no children is passed', () => {
    it('should show default content', () => {
      const tree = (
        <NamedSlot />
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and children without matching slot prop is passed', () => {
    it('should show default content', () => {
      const tree = (
        <NamedSlot>
          <h1 slot='myotherslot'>Child element</h1>
        </NamedSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and a child with matching slot prop is passed', () => {
    it('should show child element in correspondent slot element', () => {
      const tree = (
        <NamedSlot>
          <h1 slot='myslot'>Child element</h1>
        </NamedSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and more than one child with matching slot prop is passed', () => {
    it('should show children elements in correspondent slot element', () => {
      const tree = (
        <NamedSlot>
          <h1 slot='myslot'>Child element</h1>
          <div>No slot element</div>
          <div slot='myslot'>Second child element</div>
        </NamedSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })
})

describe('when the component has nested slots', () => {
  const NestedSlot = withSlot(() => {
    return (
      <div>
        <slot name='parentslot'>
          <slot name='childslot'>Default nested content</slot>
        </slot>
      </div>
    )
  })

  describe('and no children is passed', () => {
    it('should show default content', () => {
      const tree = (
        <NestedSlot />
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and a child with matching parent slot prop is passed', () => {
    it('should show child element in parent slot element', () => {
      const tree = (
        <NestedSlot>
          <h1 slot='parentslot'>Child element</h1>
        </NestedSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })

  describe('and a child with matching child slot prop is passed', () => {
    it('should show child element in child slot element', () => {
      const tree = (
        <NestedSlot>
          <h1 slot='childslot'>Child element</h1>
        </NestedSlot>
      )
      expect(render(tree)).toMatchSnapshot()
    })
  })
})

describe('when nesting components', () => {
  const ChildSlot = withSlot(() => {
    return (
      <div>
        <slot>Default child content</slot>
      </div>
    )
  })

  const ParentSlot = withSlot(() => {
    return (
      <div>
        <slot>Default parent content</slot>
        <ChildSlot />
      </div>
    )
  })

  it('the children passed to parent component should not propagate into nested component', () => {
    const tree = (
      <ParentSlot>
        <h1>Passed element</h1>
      </ParentSlot>
    )
    expect(render(tree)).toMatchSnapshot()
  })
})
