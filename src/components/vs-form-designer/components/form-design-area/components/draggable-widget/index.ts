import DraggableWidget from './draggable-widget.vue'

export * from './components'
export type Mutable<O> = {
  -readonly [K in keyof O]: O[K]
}
export type DraggableWidgetInstance = InstanceType<typeof DraggableWidget>
export { DraggableWidget }
