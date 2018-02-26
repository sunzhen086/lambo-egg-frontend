<template>
	<div class="lambo-grid-table">
		<Row>
			<Col span="20">
			<slot name="search">
				&nbsp;
			</slot>
			</Col>
			<Col span="4" style="text-align:right">
			<Dropdown trigger="custom" :visible="optionDropdownVisible" placement="bottom-end" transfer>
				<ButtonGroup>
					<Button type="ghost" icon="refresh" title="刷新表格数据" @click="tableRefresh"></Button>
					<Button type="ghost" icon="ios-keypad" title="表格选项" @click="tableSettingToggle">
				        <Icon type="ios-arrow-down"></Icon>
				    </Button>
				</ButtonGroup>
				<DropdownMenu slot="list" style="width:400px;padding:5px 10px;">
					<Tabs type="card">
						<TabPane label="导出">
							<exportData
									:tableColumns="tableColumns"
									:dataUrl="dataUrl"
									:searchParams="searchParams"
									:sortParams="sortParams"
									:paginationParams="paginationParams">
							</exportData>
						</TabPane>
						<TabPane label="列筛选">
							<div style="border-bottom: 1px solid #e9e9e9;padding-bottom:6px;margin-bottom:6px;">
								<Checkbox :value="checkAll" @click.prevent.native="handleCheckAll">全选</Checkbox>
							</div>
							<CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange">
								<Checkbox v-for="(item, index) in columns" :key="item.key" :label="item.title"></Checkbox>
								<br/><br/>
								<Button type="primary" long>确定</Button>
							</CheckboxGroup>

						</TabPane>
						<TabPane label="样式">
							显示边框
							<i-switch v-model="border" style="margin-right: 5px"></i-switch>
							显示斑马纹
							<i-switch v-model="stripe" style="margin-right: 5px"></i-switch>
							显示表头
							<i-switch v-model="showHeader" style="margin-right: 5px"></i-switch><br><br> 表格尺寸
							<Radio-group v-model="size" type="button">
								<Radio label="large">大</Radio>
								<Radio label="default">中(默认)</Radio>
								<Radio label="small">小</Radio>
							</Radio-group>
							<br><br>
							<Button type="default" long>应用为全局样式</Button>
						</TabPane>
					</Tabs>
					<Button type="error" icon="close" size="small" title="关闭" style="position:absolute;top:10px;right:10px;" @click="closeTableSettingDropdown"></Button>
				</DropdownMenu>
			</Dropdown>
			</Col>
		</Row>
		<Row style="margin-top:15px;">
			<Col span="24">
			<Table 
				:columns="tableColumns" 
				:data="tableData" 
				:stripe="tableStripe" 
				:border="tableBorder" 
				:showHeader="tableShowHeader" 
				:width="tableWidth" 
				:height="tableHeight" 
				:loading="tableLoading" 
				:disabledHover="disabledHover" 
				:highlightRow="highlightRow" 
				:rowClassName="rowClassName" 
				:size="tableSize" 
				:noDataText="noDataText" 
				:noFilteredDataText="noFilteredDataText" 
				@on-sort-change="onSortChange" 
				@on-current-change="onCurrentChange" 
				@on-select="onSelect" 
				@on-select-cancel="onSelectCancel" 
				@on-select-all="onSelectAll" 
				@on-selection-change="onSelectionChange" 
				@on-filter-change="onFilterChange" 
				@on-row-click="onRowClick" 
				@on-row-dblclick="onRowDblclick" 
				@on-expand="onExpand">
			</Table>
			</Col>
		</Row>
		<Row style="margin-top:15px;">
			<Col span="24" style="text-align:right">
			<Page 
				:total="totalNumber" 
				:current="currentPage" 
				show-sizer 
				show-total 
				show-elevator 
				@on-change="onPageChange" 
				@on-page-size-change="onPageSizeChange">
			</Page>
			</Col>
		</Row>
	</div>
</template>
<script>
	import util from '@/libs/util.js';
	import exportData from "./components/export-data.vue";
	export default {
		props: {
			//取数的url
			dataUrl: {
				type: String
			},
			//查询条件
			searchParams: {
				type: Object
			},
			data: {
				type: Array,
				default() {
					return [];
				}
			},
			columns: {
				type: Array,
				default() {
					return [];
				}
			},
			size: {
				validator(value) {
					return oneOf(value, ['small', 'large', 'default']);
				}
			},
			width: {
				type: [Number, String]
			},
			height: {
				type: [Number, String]
			},
			stripe: {
				type: Boolean,
				default: true
			},
			border: {
				type: Boolean,
				default: true
			},
			showHeader: {
				type: Boolean,
				default: true
			},
			highlightRow: {
				type: Boolean,
				default: false
			},
			rowClassName: {
				type: Function,
				default() {
					return '';
				}
			},
			context: {
				type: Object
			},
			noDataText: {
				type: String
			},
			noFilteredDataText: {
				type: String
			},
			disabledHover: {
				type: Boolean
			},
			loading: {
				type: Boolean,
				default: false
			}
		},
		data() {
			return {
				tableData: this.data,
				tableColumns: this.columns,
				tableStripe: this.stripe,
				tableBorder: this.border,
				tableShowHeader: this.showHeader,
				tableWidth: this.width,
				tableHeight: this.height,
				tableSize: this.size,
				tableLoading: this.loading,

				//分页相关参数
				totalNumber: 0,
				currentPage: 1,
				limitNumber: 10,
				//表格选项
				optionDropdownVisible: false,

				//列筛选
				checkAll: true,
				checkAllGroup: [],
				//导出格式
				dataExportFormat: "xlsx",
				//排序
				sortParams: {}
			}
		},
		computed: {
			columnNameArr() {
				var arr = [];
				for(var column of this.columns) {
					arr.push(column.title);
				}
				return arr;
			},
			paginationParams() {
				var self = this;
				return {
					offset: (self.currentPage - 1) * self.limitNumber,
					limit: self.limitNumber
				}
			}
		},
		watch: {
			searchParams: {
				handler: function(val, oldVal) {
					this.tableRefresh();
				},
				deep: true
			}
		},
		methods: {
			tableRefresh: function() {
				var self = this;
				self.tableLoading = true;
				util.ajax.get(self.dataUrl, {
					params: Object.assign({},self.paginationParams, self.searchParams, self.sortParams)
				}).then(function(resp) {
					self.tableData = resp.data.rows;
					self.totalNumber = resp.data.total;
					self.tableLoading = false;
				})
			},
			onPageChange: function(currentPageIndex) {
				this.currentPage = currentPageIndex;
				this.tableRefresh();
			},
			onPageSizeChange: function(currentLimitNumber) {
				this.limitNumber = currentLimitNumber;
				this.tableRefresh();
			},
			handleCheckAll() {
				if(this.checkAll) {
					this.checkAllGroup = this.columnNameArr;
				} else {
					this.checkAllGroup = [];
				}
			},
			checkAllGroupChange(data) {
				if(data.length === this.columnNameArr.length) {
					this.checkAll = true;
				} else if(data.length > 0) {
					this.checkAll = false;
				} else {
					this.checkAll = false;
				}
			},
			tableSettingToggle() {
				this.optionDropdownVisible = !this.optionDropdownVisible;
			},
			closeTableSettingDropdown() {
				this.optionDropdownVisible = false;
			},
			onSortChange(sortParams) {
				this.sortParams = {
					sort: sortParams.column.sortField || sortParams.key,
					order: sortParams.order == "normal" ? "" : sortParams.order
				};
				this.tableRefresh();
			},
			onCurrentChange(params) {
				this.$emit("on-current-change", params);
			},
			onSelect(params) {
				this.$emit("on-select", params);
			},
			onSelectCancel(params) {
				this.$emit("on-select", params);
			},
			onSelectAll(params) {
				this.$emit("on-select-all", params);
			},
			onSelectionChange(params) {
				this.$emit("on-selection-change", params);
			},
			onFilterChange(params) {
				this.$emit("on-filter-change", params);
			},
			onRowClick(params) {
				this.$emit("on-row-click", params);
			},
			onRowDblclick(params) {
				this.$emit("on-row-dblclick", params);
			},
			onExpand(params) {
				this.$emit("on-expand", params);
			}
		},
		mounted() {
			this.tableRefresh();
			this.checkAllGroup = this.columnNameArr;
		},
        components:{
            exportData
        }
	}
</script>
<style>

</style>