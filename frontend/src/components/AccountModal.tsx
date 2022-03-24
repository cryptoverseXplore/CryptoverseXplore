import {
  Box,
  Button,
  Flex,
  Link,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Text,
} from "@chakra-ui/react";
import { ExternalLinkIcon, CopyIcon } from "@chakra-ui/icons";
import { useEthers } from "@usedapp/core";
import Identicon from "./Identicon";

type Props = {
  isOpen: any;
  onClose: any;
};

export default function AccountModal({ isOpen, onClose }: Props) {
  const { account, deactivate } = useEthers();

  function handleDeactivateAccount() {
    deactivate();
    onClose();
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} isCentered size="md">
      <ModalOverlay />
      <ModalContent
        background="gray.900"
        border="1px"
        borderStyle="solid"
        borderColor="gray.700"
        borderRadius="3xl"
      >
        <ModalHeader color="white" px={4} fontSize="lg" fontWeight="medium">
          Account
        </ModalHeader>
        <ModalCloseButton
          color="gray.400"
          background="transparent"
          fontSize="sm"
          _hover={{
            color: "orange",
          }}
        />
        <ModalBody pt={0} px={4}>
          <Box
            borderRadius="3xl"
            border="1px"
            borderStyle="solid"
            borderColor="gray.600"
            px={5}
            pt={4}
            pb={2}
            mb={3}
          >
            <Flex justifyContent="space-between" alignItems="center" mb={3}>
              <Text color="gray.400" fontSize="sm">
                Connected with MetaMask
              </Text>

              <Button
                variant="outline"
                size="sm"
                borderRadius="3xl"
                color="gray.400"
                background="transparent"
                fontSize="13px"
                fontWeight="normal"
                px={2}
                height="26px"
                _hover={{
                  textDecoration: "none",
                  color: "orange",
                }}

                onClick={handleDeactivateAccount}
              >
                Disconnect
              </Button>

            </Flex>
            <Flex alignItems="center" mt={2} mb={4} lineHeight={1}>
              <Identicon />
              <Text
                color="white"
                fontSize="xl"
                fontWeight="semibold"
                ml="2"
                lineHeight="1.1"
              >
                {account &&
                  `${account.slice(0, 6)}...${account.slice(
                    account.length - 4,
                    account.length
                  )}`}
              </Text>
            </Flex>
            <Flex alignContent="center" m={3}>
              <Button
                variant="link"
                color="gray.400"
                background="transparent"
                fontWeight="normal"
                fontSize="sm"
                _hover={{
                  textDecoration: "none",
                  color: "orange",
                }}
                onClick={() => {navigator.clipboard.writeText(`${account}`)}}
              >
                <CopyIcon mr={1} />
                Copy Address
              </Button>
              <Link
                fontSize="sm"
                display="flex"
                alignItems="center"
                href={`https://rinkeby.etherscan.io/address/${account}`}
                isExternal
                color="gray.400"
                ml={6}
                _hover={{
                  color: "orange",
                  textDecoration: "underline",
                }}
              >
                <ExternalLinkIcon mr={1} />
                View on Explorer
              </Link>
            </Flex>
          </Box>
        </ModalBody>

      </ModalContent>
    </Modal>
  );
}
