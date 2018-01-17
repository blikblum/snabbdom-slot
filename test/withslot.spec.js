/* global describe, it, expect */

import { withSlot } from '../src/withslot'
import render from './render-tree'
import Snabbdom from 'snabbdom-pragma'

describe('withSlot', () => {
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
          </MainSlot>
        )
        expect(render(tree)).toMatchSnapshot()
      })
    })
  })
})
