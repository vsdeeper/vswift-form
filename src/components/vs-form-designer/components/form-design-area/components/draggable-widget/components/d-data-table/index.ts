import type { TableProps } from 'element-plus'
import DDataTable from './d-data-table.vue'

export type DDataTableInstance = InstanceType<typeof DDataTable>
export type DDataTableOptions = Partial<TableProps<Record<string, any>[]>> & {
  label?: string
  required?: boolean
}
export { DDataTable }
