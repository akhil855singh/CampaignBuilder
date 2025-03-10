import { Image, Text, Button, Card, CardBody, CardFooter, CardHeader, Heading, SimpleGrid, Center, border, Divider, Flex, Popover, useBoolean } from "@chakra-ui/react";
import React, { useState } from "react";

const SelectionPopup = () => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    const togglePopup = () => {
        setIsPopupOpen(!isPopupOpen);
    };

    const handleOutsideClick = (event: React.MouseEvent<HTMLDivElement>) => {
        if ((event.target as HTMLDivElement).id === "popup-overlay") {
            togglePopup();
        }
    };

    return (
        <SimpleGrid spacing={ 4 } justifyContent="center" display="flex" templateColumns="repeat(3, minmax(200px, 1fr))">
            <Card width="250px">
                <CardHeader style={ { background: "#15a78a" } }>
                    <Flex justify="space-between" align="center">
                        <Heading size='md' color={ "white" } display="flex" alignItems="center"> Decision</Heading>
                        <Image src="https://via.placeholder.com/25" display="flex" alignItems="center" />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>An action is something executed by Vinmax (e.g. send an email)</Text>
                </CardBody>
                <Divider color={ "#e6e9ed" } />
                <CardFooter justifyContent="center" display="flex">
                    <Button>Select</Button>
                </CardFooter>
            </Card>
            <Card width="250px">
                <CardHeader style={ { background: "#e90010" } }>
                    <Flex justify="space-between" align="center">
                        <Heading size='md' color={ "white" } display="flex" alignItems="center"> Action</Heading>
                        <Image src="https://via.placeholder.com/25" display="flex" alignItems="center" />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>An action is something executed by Vinmax (e.g. send an email).</Text>
                </CardBody>
                <Divider color={ "#e6e9ed" } />
                <CardFooter justifyContent="center" display="flex">
                    <Button>Select</Button>
                </CardFooter>
            </Card>
            <Card width="250px">
                <CardHeader style={ { background: "#f3533e" } }>
                    <Flex justify="space-between" align="center">
                        <Heading size='md' color={ "white" } display="flex" alignItems="center"> Condition</Heading>
                        <Image src="https://via.placeholder.com/25" display="flex" alignItems="center" />
                    </Flex>
                </CardHeader>
                <CardBody>
                    <Text>A condition is based on known profile field values or submitted form data.</Text>
                </CardBody>
                <Divider color={ "#e6e9ed" } />

                <CardFooter justifyContent="center" display="flex">
                    <Button >Select</Button>
                </CardFooter>
            </Card>
        </SimpleGrid>

    );
};

export default SelectionPopup;