import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const func: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;

  // For testing, we'll deploy a mock ERC20 token first
  const mockToken = await deploy("MockERC20", {
    from: deployer,
    args: ["Mock Token", "MTK", "1000000000000000000000000"], // 1M tokens
    log: true,
  });

  // Deploy ChessBet contract
  await deploy("ChessBet", {
    from: deployer,
    args: [mockToken.address],
    log: true,
  });
};

export default func;
func.tags = ["ChessBet"]; 