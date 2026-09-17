# 树莓派5 安装 Ubuntu24.04
by zhou on 3 10 月, 2024
买了一个树莓派5，想着就是可以有一个低成本的电脑可以运行，还能快速部署和使用，顺便写篇教程

## 准备材料
树莓派5
SD卡
type-c 电源（24W左右）
能用的电脑
SD卡转接器（USB转SD）
显示器
HDMI 转 micro HDMI 转接线
## 开始
首先，电脑安装 Raspberry Pi Imager（https://www.raspberrypi.com/software/），SD卡连接到电脑

打开 Raspberry Pi Imager ，CHOOSE DEVICE 和 选择SD卡 选取 Raspberry Pi 5 和你连接的SD卡


Raspberry Pi Imager 界面
打开 选择操作系统 界面，如下图所示


选择 “Other general-purpose OS” ，在 “Ubuntu” 选项中选择 “Ubuntu Desktop 24.04.1 LTS(64-bit)”，最后 “NEXT”

注意：树莓派5仅支持Ubuntu 23 , 24及将来的新版本

在弹出的快速设置中不用填写，在Ubuntu中无法应用这些设置

确定格式化后开始烧录，烧录过程大约半小时（包括检验文件）。烧录完成后，弹出SD卡

树莓派安装
插入刚烧录好的SD卡，连接电源启动树莓派，第一次启动时间稍久。之后的安装可以按照Ubuntu的安装引导进行。

注意：Ubuntu的安装中没有“扩展”和“简化”安装，默认是扩展安装（全部的软件），若不想安装，可以运行以下代码卸载

sudo apt-get upgrad
sudo apt-get install liberoffice*
Categories:
未分类
Tags:
No Tag