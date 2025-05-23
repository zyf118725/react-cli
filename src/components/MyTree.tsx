import { Tree } from 'antd';

export default function MyTree({ treeData, checkedKeys, setCheckedKeys }: any) {
  return (
    <div>
      <Tree
        checkable
        defaultExpandAll={true} // 自动展开所有节点
        checkedKeys={checkedKeys}
        onCheck={(e: any) => setCheckedKeys(e)}
        treeData={treeData}
        fieldNames={{
          key: 'id',
          title: 'name',
        }}
      />
    </div>
  );
}
