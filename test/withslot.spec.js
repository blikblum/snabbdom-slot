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
        <MainSlot/>
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
        <NamedSlot/>
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
})
