import type { FC } from 'react';
import {
    Avatar,
    Box,
    IconButton,
    Link,
    styled,
    Tooltip,
    Typography,
} from '@mui/material';
import { SectionHeader, StepperBox } from './SharedComponents';
import useUiConfig from 'hooks/api/getters/useUiConfig/useUiConfig';
import { allSdks, type SdkName, type Sdk } from './sharedTypes';
import copy from 'copy-to-clipboard';
import useToast from 'hooks/useToast';
import CopyIcon from '@mui/icons-material/FileCopy';
import { formatAssetPath } from '../../utils/formatPath';
import { Stepper } from './Stepper';
import { Badge } from '../common/Badge/Badge';
import { Markdown } from 'component/common/Markdown/Markdown';
import type { CodeComponent } from 'react-markdown/lib/ast-to-react';
import android from './snippets/android.md?raw';
import go from './snippets/go.md?raw';
import javascript from './snippets/javascript.md?raw';
import nodejs from './snippets/nodejs.md?raw';
import python from './snippets/python.md?raw';
import ruby from './snippets/ruby.md?raw';
import svelte from './snippets/svelte.md?raw';
import vue from './snippets/vue.md?raw';
import flutter from './snippets/flutter.md?raw';
import java from './snippets/java.md?raw';
import dotnet from './snippets/dotnet.md?raw';
import php from './snippets/php.md?raw';
import react from './snippets/react.md?raw';
import rust from './snippets/rust.md?raw';
import swift from './snippets/swift.md?raw';

const snippets: Record<SdkName, string> = {
    Android: android,
    Go: go,
    JavaScript: javascript,
    'Node.js': nodejs,
    Python: python,
    Ruby: ruby,
    Svelte: svelte,
    Vue: vue,
    Flutter: flutter,
    Java: java,
    '.NET': dotnet,
    PHP: php,
    React: react,
    Rust: rust,
    Swift: swift,
};

const SpacedContainer = styled('div')(({ theme }) => ({
    padding: theme.spacing(5, 8, 2, 8),
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(3),
}));

const StyledCodeBlock = styled('pre')(({ theme }) => ({
    backgroundColor: theme.palette.background.elevation1,
    padding: theme.spacing(2),
    borderRadius: theme.shape.borderRadius,
    overflow: 'auto',
    fontSize: theme.typography.body2.fontSize,
    wordBreak: 'break-all',
    whiteSpace: 'pre-wrap',
    position: 'relative',
    maxHeight: theme.spacing(34),
}));

const CopyToClipboard = styled(Tooltip)(({ theme }) => ({
    position: 'absolute',
    top: theme.spacing(1),
    right: theme.spacing(1),
}));

const CopyBlock: FC<{ title: string; code: string }> = ({ title, code }) => {
    const onCopyToClipboard = (data: string) => () => {
        copy(data);
        setToastData({
            type: 'success',
            title: 'Copied to clipboard',
        });
    };
    const { setToastData } = useToast();

    return (
        <StyledCodeBlock>
            {code}
            <CopyToClipboard title={title} arrow>
                <IconButton onClick={onCopyToClipboard(code)} size='small'>
                    <CopyIcon />
                </IconButton>
            </CopyToClipboard>
        </StyledCodeBlock>
    );
};

const ChangeSdk = styled('div')(({ theme }) => ({
    display: 'inline-flex',
    gap: theme.spacing(3),
    padding: theme.spacing(1, 2),
    border: `1px solid ${theme.palette.divider}`,
    borderRadius: theme.shape.borderRadius,
    marginBottom: theme.spacing(3),
}));

const CodeRenderer: CodeComponent = ({ inline = false, children }) => {
    if (!inline && typeof children?.[0] === 'string') {
        return <CopyBlock code={children[0]} title='Copy code' />;
    }

    return <code>{children}</code>;
};

interface ITestSdkConnectionProps {
    sdk: Sdk;
    apiKey: string;
    feature: string;
    onSdkChange: () => void;
}

export const TestSdkConnection: FC<ITestSdkConnectionProps> = ({
    sdk,
    apiKey,
    feature,
    onSdkChange,
}) => {
    const { uiConfig } = useUiConfig();

    const sdkIcon = allSdks.find((item) => item.name === sdk.name)?.icon;
    const clientApiUrl = `${uiConfig.unleashUrl}/api/`;
    const frontendApiUrl = `${uiConfig.unleashUrl}/api/frontend/`;
    const apiUrl = sdk.type === 'client' ? clientApiUrl : frontendApiUrl;

    const snippet = (snippets[sdk.name] || '')
        .replace('<YOUR_API_TOKEN>', apiKey)
        .replace('<YOUR_API_URL>', apiUrl)
        .replaceAll('<YOUR_FLAG>', feature);

    return (
        <SpacedContainer>
            <Typography variant='h2'>Connect an SDK to Unleash</Typography>
            <StepperBox>
                <Stepper active={2} steps={3} />
                <Badge color='secondary'>3/3 - Test connection</Badge>
            </StepperBox>
            <Box sx={{ mt: 2 }}>
                <ChangeSdk>
                    {sdkIcon ? (
                        <Avatar
                            variant='circular'
                            src={formatAssetPath(sdkIcon)}
                            alt={sdk.name}
                        />
                    ) : null}
                    <Link onClick={onSdkChange} component='button'>
                        Change SDK
                    </Link>
                </ChangeSdk>
                <SectionHeader>Setup the SDK</SectionHeader>
                <Markdown components={{ code: CodeRenderer }}>
                    {snippet}
                </Markdown>
            </Box>
        </SpacedContainer>
    );
};

// Use a default export for lazy-loading
export default TestSdkConnection;
