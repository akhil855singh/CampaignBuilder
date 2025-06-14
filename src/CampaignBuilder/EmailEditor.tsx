import React, { useState } from "react";
import { Box, Button, Flex, VStack, Text } from "@chakra-ui/react";
import CodeMirror from "@uiw/react-codemirror";
import { html } from "@codemirror/lang-html";

const EmailEditor = () => {
    const [code, setCode] = useState(`
  <!doctype html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">

<head>
    <title>
        {subject}
    </title>
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,500,700" rel="stylesheet" type="text/css">
    <style type="text/css">
        #outlook a {
            padding: 0;
        }

        .ReadMsgBody {
            width: 100%;
        }

        .ExternalClass {
            width: 100%;
        }

        .ExternalClass * {
            line-height: 100%;
        }

        body {
            margin: 0;
            padding: 0;
            -webkit-text-size-adjust: 100%;
            -ms-text-size-adjust: 100%;
        }

        table,
        td {
            border-collapse: collapse;
            mso-table-lspace: 0pt;
            mso-table-rspace: 0pt;
        }

        img {
            border: 0;
            height: auto;
            line-height: 100%;
            outline: none;
            text-decoration: none;
            -ms-interpolation-mode: bicubic;
        }

        p {
            display: block;
            margin: 13px 0;
        }
        @media only screen and (max-width:480px) {
            @-ms-viewport {
                width: 320px;
            }
            @viewport {
                width: 320px;
            }
        }
        body {
            font-family: "Open Sans", Helvetica, Arial, sans-serif !important;
            font-size:14px;
            line-height:1.6;
            text-align:left;
            color:#414141;
        }
        div[data-slot="text"] {
            font-size:14px !important;
            line-height:1.6 !important;
            text-align:left !important;
            color:#414141 !important;
            margin-bottom: 10px !important;
        }
        div[style="clear:both"] {
            margin-bottom: 20px !important;
        }
        .imagecard {
            background: #eeeeee !important;
        }
        .imagecard-caption {
            font-size:12px !important;
            line-height:1.6 !important;
            text-align:center !important;
            color:#414141 !important;
            background: #eeeeee !important;
            padding: 10px !important;
        }
        h1, h2, h3, h4, h5, h6 {
            margin: 0 !important;
            margin-bottom: 10px !important;
        }
        .outlook-group-fix { width:100% !important; }
        @media only screen and (min-width:480px) {
            .mj-column-per-100 {
                width: 100% !important;
            }
        }
    </style>
</head>
<body style="background-color:#ffffff;">
    <div data-section-wrapper="1" style="background-color:#ffffff;">
        <div data-section="1" style="Margin:0px auto;border-radius:4px;max-width:600px;">
            <table align="center" border="0" cellpadding="0" cellspacing="0" role="presentation" style="width:100%;border-radius:4px;">
                <tbody>
                    <tr>
                        <td style="direction:ltr;padding:20px 0;text-align:center;vertical-align:top;">
                            <div data-slot-container="1" class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table background="#FFFFFF" border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                    <tbody>
                                        <tr>
                                            <td style="background-color:#FFFFFF;vertical-align:top;padding:20px 20px;">
                                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" width="100%">
                                                    <tr>
                                                        <td align="left" style="padding:0;word-break:break-word;">
                                                            <div data-slot="text" style="font-family:'Open Sans', Helvetica, Arial, sans-serif;font-size:14px;line-height:1.6;text-align:left;color:#414141;">
                                                                <h1>Hello World!</h1>
                                                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid officia consequatur placeat reprehenderit excepturi, tempore,
                                                                id quos quaerat ab fuga.
                                                                <br/>
                                                                <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Inventore, voluptate.
                                                                <br/>
                                                                <br/> Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                                                                Dignissimos alias rerum nemo ducimus modi perspiciatis.
                                                            </div>
                                                        </td>
                                                    </tr>
                                                </table>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div data-slot-container="1" class="mj-column-per-100 outlook-group-fix" style="font-size:13px;text-align:left;direction:ltr;display:inline-block;vertical-align:top;width:100%;">
                                <table border="0" cellpadding="0" cellspacing="0" role="presentation" style="vertical-align:top;" width="100%">
                                    <tr>
                                        <td align="left" style="padding:20px 20px;word-break:break-word;">
                                            <div data-slot="text" style="font-family:'Open Sans', Helvetica, Arial, sans-serif!important;font-size:12px!important;line-height:1.4!important;text-align:left!important;color:#999999!important;">
                                                {unsubscribe_text} | {webview_text}
                                            </div>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</body>
</html>

  `);

    return (
        <Flex height="100vh" p={ 4 } gap={ 4 } >
            <Box flex={ 1 } p={ 4 } bg="gray.50" borderRadius="md" overflowY="auto">
                <Text fontSize="lg" fontWeight="bold" mb={ 2 }>
                    Live Preview
                </Text>
                <Box
                    p={ 4 }
                    bg="white"
                    boxShadow="md"
                    borderRadius="md"
                    dangerouslySetInnerHTML={ { __html: code } }
                />
            </Box>
            <VStack flex={ 1 } spacing={ 4 } align="stretch">
                <Flex gap={2}>
                    <Button colorScheme="red">Save</Button>
                    <Button colorScheme="gray">Close Builder</Button>
                </Flex>
                <Box border="1px solid" borderColor="gray.300" borderRadius="md" overflow="hidden">
                    <CodeMirror
                        value={ code }
                        extensions={ [html()] }
                        onChange={ (value) => setCode(value) }
                        style={ { width: screen.width / 2, height:"100%", overflow:"auto", fontSize: "14px" } }
                    />
                </Box>
            </VStack>
        </Flex>
    );
};

export default EmailEditor;
