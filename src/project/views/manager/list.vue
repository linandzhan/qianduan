<template>
	<el-row class="page">
		<!--    搜索-->
		<el-col :span="24">
			<search style="width: 95%;margin: 20px auto" :search-items="searchItems" @on-search="searchBySearchItem"></search>
		</el-col>
		<!--    按钮和分页-->
		<el-col :span="24">
			<div style="width: 95%;margin:0 auto 20px auto;">
				<!-- <el-button @click="demo">{{$t('message.projectName')}}</el-button> -->
				<el-button icon="el-icon-plus" type="primary" @click="toCreate">新建</el-button>
				<el-dropdown :trigger="'click'" @command="handleClick" size="medium" @visible-change="onMenuChange">
					<el-button icon="el-icon-menu" style="background:#3e5265;color: white ">更多操作<i :class="menu.visible?'el-icon-caret-top':'el-icon-caret-bottom'"></i></el-button>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item icon="el-icon-circle-check" command="启用" :disabled="selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0"
						 :style="(selectList.findIndex(s=>{return s.status === '启用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)','cursor': 'not-allowed'}:{'color':'#fff'}"
						 @click="batchEnable">
							启用
						</el-dropdown-item>
						<el-dropdown-item icon="el-icon-circle-close" command="禁用" :disabled="selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0"
						 :style="(selectList.findIndex(s=>{return s.status === '禁用'}) >=0 || selectList.length === 0)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
						 @click.stop="batchDisable">
							禁用
						</el-dropdown-item>
						<el-dropdown-item icon="el-icon-edit" command="编辑" :disabled="selectList.length !== 1" :style="(selectList.length !== 1)?{'color':'rgba(255,255,255,0.4)'}:{'color':'#fff'}"
						 @click.stop="handleEdit">
							编辑
						</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				<div class="pager-group">
					<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="page"
					 :page-sizes="[10, 20, 30, 40]" :page-size="pageSize" layout="total, sizes, jumper, prev, next" :total="total">
					</el-pagination>
				</div>
			</div>
		</el-col>
		<!--    表格-->
		<el-col :span="24">
			<el-table :data="data" style="width: 95%;margin:0 auto;" @selection-change="handleSelectionChange" @row-dblclick="handleRowClick">
				<el-table-column type="selection" width="55">
				</el-table-column>
				<!-- <el-table-column label="账号">
					<template slot-scope="scope">
						<el-button @click.native.prevent="toDetail(scope.row)" type="text" size="small">
							{{scope.row.username}}
						</el-button>
					</template>
				</el-table-column> -->
				<el-table-column prop="username" label="姓名">
				</el-table-column>
				<el-table-column prop="phone" label="手机号">
				</el-table-column>
				<!-- <el-table-column prop="createAt" label="创建时间" sortable>
				</el-table-column> -->
				<el-table-column prop="type" label="状态">
				</el-table-column>
				<el-table-column fixed="right" align="center" label="操作" width="200">
					<template slot-scope="scope">
						<el-button @click.stop="handleStatusChange(scope.row)" type="text" size="small">{{scope.row.type.indexOf('启用') >= 0 ? '禁用' : '启用'}}</el-button>
					</template>
				</el-table-column>
			</el-table>
		</el-col>
		<!--    新建-->
		<i-create :dialog-visible="createProps.visible" @on-dialog-close="handleClose" @on-save-success="handleSave" />

		<!--    编辑-->
		<i-edit :dialog-visible="editProps.visible" :edit-id="editId" @on-dialog-close="handleClose" @on-save-success="handleSave" />


	</el-row>
</template>
<script>
	import Search from "@/framework/components/search";
	import ICreate from "./create"
	import IEdit from "./edit"
	import {
		post
	} from "@/framework/http/request";
	import Emitter from '@/framework/mixins/emitter'
	import {
		search,
		count,
		del,
		enable,
		disable
	} from './manager-service'

	export default {
		mixins: [Emitter],
		data() {
			return {
				model: "employeeQuery",
				createProps: {
					visible: false
				},
				editProps: {
					visible: false
				},
				menu: {
					visible: false
				},
				editId: 0, //编辑id
				data: [],
				selectList: [],
				sort: {
					asc: [],
					desc: []
				},
				pageSize: 10,
				page: 1,
				total: 0,
				extraParam: {},
				roleList: [],
				searchItems: [{
						name: "用户名",
						key: "username",
						type: "string"
					},
					// {
					// 	name: "姓名",
					// 	key: "realname",
					// 	type: "string"
					// },
					// {
					// 	name: "角色",
					// 	key: "roleId",
					// 	type: "select",
					// 	displayValue: [],
					// 	value: []
					// },
					{
						name: "状态",
						key: "type",
						type: "select",
						displayValue: ["禁用", "启用"],
						value: ["禁用", "启用"]
					}
				]
			};
		},
		computed: {
			route() {
				return this.$route;
			}
		},
		components: {
			Search,
			ICreate,
			IEdit
		},
		methods: {
			demo() {
				this.$confirm(this.$t('message.system'), '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$message({
						type: 'success',
						message: '删除成功!'
					});
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				})
			},
			handleEdit() {
				this.editId = this.selectList[0].id
				this.editProps.visible = true;
			},
			handleStatusChange(row) {
				let status;
				let _t = this;
				if (row.type.indexOf('启用') >= 0) {
					status = '禁用'
				} else {
					status = '启用'
				}
				this.$confirm(`确定${status}选中内容？`, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					if (status === '禁用') {
						disable({
							id: row.id
						}, res => {
							_t.$message({
								type: 'success',
								message: '已禁用!'
							});
							_t.search(_t.page);
						})
					} else {
						enable({
							id: row.id
						}, res => {
							_t.$message({
								type: 'success',
								message: '已启用!'
							});
							_t.search(_t.page);
						})
					}
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});

			},
			handlePageSizeChange(pageSize) {
				this.pageSize = pageSize;
				this.search(1);
			},
			handlePageChange(page) {
				this.search(page);
			},
			handleSortChange(sort) {
				let key = sort.key;
				let order = sort.order;
				let asc = this.sort.asc;
				let desc = this.sort.desc;
				if (asc.indexOf(key) > -1) {
					let idx = asc.indexOf(key);
					asc.splice(idx, 1);
				}
				if (desc.indexOf(key) > -1) {
					let idx = desc.indexOf(key);
					desc.splice(idx, 1);
				}
				if (order !== "normal") {
					this.sort[order].push(key);
				}
				this.search(1);
			},
			searchBySearchItem(searchItems) {
		//		console.log(searchItems)
				let keys = [];
				for (
					let i = 0,
						searchItemList = this.searchItems,
						len = searchItemList.length; i < len; i++
				) {
					keys.push(searchItemList[i].key);   
				}
				console.log(keys)
				for (let i in keys) {
					if (searchItems[keys[i]]) {
						this.extraParam[keys[i]] = searchItems[keys[i]];
					} else {
						delete this.extraParam[keys[i]];
					}
				}

			//	console.log(this.extraParam)
			//如果roleId存在。
				// if (this.extraParam.roleId) {
				// 	this.roleList.forEach(item => {
				// 		if (item.name === this.extraParam.roleId) {
				// 			this.extraParam.roleId = item.id;
				// 		}
				// 	})
				// } 不需要考虑角色的搜索

				this.search(1);
			},


			toCreate() {
				this.createProps.visible = true;
			},


			search(page) {
				let _t = this;
				_t.page = page;
				_t.extraParam.page = page;
				_t.extraParam.pageSize = _t.pageSize;
				let param = {
					// pageable: {
					// 	page: page,
					// 	size: _t.pageSize,
					// 	sort: _t.sort
					// },
					[this.model]: _t.extraParam
				};
				// if (_t.extraParam.roleId) {
				// 	param.roleId = _t.extraParam.roleId;
				// 	delete param[this.model].roleId;
				// }
				// if (
				// 	param.pageable.sort.asc.length === 0 &&
				// 	param.pageable.sort.desc.length === 0
				// ) {
				// 	delete param.pageable.sort;
				// }
				console.log(param)
				search(param, res => {
					let data = res;
					// console.log(data)
					_t.data = data.data.items;
					console.log(_t.data)
					_t.total = parseInt(data.data.total)
			//		_t.getTotal();
				});
			},
			// getTotal() {
			// 	let _t = this;
			// 	let param = {
			// 		[this.model]: _t.extraParam
			// 	};
			// 	count(param, res => {
			// 		_t.total = parseInt(res);
			// 	});
			// },
			// handleTransportSelectList(list) {
			// 	this.selectList = list;
			// },
			//批量删除
			batchDelete() {
				this.broadcast("SiTable", "on-get-selectList");
				this.$nextTick(() => {
					let selectList = this.selectList;
					if (selectList.length === 0) {
						this.$notify.warning({
							title: "至少选择一条数据"
						});
						return;
					}
					this.$confirm('确定删除所选记录吗?', '删除提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						selectList.forEach((item, index) => {
							del({
								id: item.id
							}, res => {
								if (selectList.length - 1 === index) {
									this.$message.success(('删除成功'));
									this.search(this.page);
								}
							})
						})
					}).catch(() => {
						this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				});
			},
			//批量启用
			batchEnable() {
				let _t = this;
				let selectList = this.selectList;
				this.$confirm('确定启用所选的记录吗?', '启用提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					selectList.map(s => {
						enable({
							id: s.id
						}, res => {
							_t.search(_t.page);
							// this.$message({
							//   type: 'success',
							//   message: '删除成功!'
							// });
						})
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},
			//批量禁用
			batchDisable() {
				let _t = this;
				let selectList = this.selectList;
				this.$confirm('确定启用所选的记录吗?', '启用提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					selectList.map(s => {
						disable({
							id: s.id
						}, res => {
							_t.search(_t.page);
							// this.$message({
							//   type: 'success',
							//   message: '删除成功!'
							// });
						})
					})

				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消'
					});
				});
			},

			delete(id) {
				let _t = this;
				del({
					id: id
				}, res => {
					_t.search(_t.page);
				});
			},
			enable(id, url) {
				let _t = this;
				post(url, {
					id: id
				}, res => {
					_t.search(_t.page);
				});
			},
			handleClose() {
				this.createProps.visible = false;
				this.editProps.visible = false;
			},
			handleSave() {
				this.createProps.visible = false;
				this.editProps.visible = false;
				this.search(this.page);
			},
			handleSelectionChange(val) {
				this.selectList = val;
			},
			handleRowClick(row) {
				this.editId = row.id;
				this.editProps.visible = true;
			},
			toDetail(row) {
				this.$router.push({
					path: '/manager/show/' + row.id
				})
			},
			handleCurrentChange(val) {
				this.page = val;
				this.search(this.page);
			},
			handleSizeChange(pageSize) {
				this.pageSize = pageSize;

				this.search(this.page);
			},
			onMenuChange(val) {
				console.log(val);
			},
			handleClick(command) {
				switch (command) {
					case '编辑':
						console.log('编辑');
						this.editId = this.selectList[0].id;
						this.editProps.visible = true;
						break;
					case '启用':
						console.log('启用');
						this.batchEnable();
						break;
					case '禁用':
						console.log('禁用')
						this.batchDisable();
						break;
				}
			},
			// roleSearch() {
			// 	post(`api/role/search`, {
			// 			role: {},
			// 			pageable: {
			// 				page: 1,
			// 				size: 9999
			// 			}
			// 		},
			// 		res => {
			// 			res.forEach(item => {
			// 				this.searchItems[2].displayValue.push(item.name);
			// 				this.searchItems[2].value.push(item.name);
			// 				this.roleList.push({
			// 					name: item.name,
			// 					id: item.id
			// 				})
			// 			});
			// 			console.log(this.searchItems);

			// 		}
			// 	)
			// }
		},
		mounted() {
			console.log('321321', this.extraParam)
			this.search(1);
			console.log('321321321', this.extraParam)

			this.roleSearch();
		}
	};
</script>
<style lang="less" scoped>
	.page {
		overflow-y: auto;
		overflow-x: hidden;
	}

	.el-button+.el-button {
		margin-left: 2px;
	}

	.el-button--default:hover {
		color: #00a16c;
		border: 1px solid#00a16c;
		background: white;
	}
</style>
