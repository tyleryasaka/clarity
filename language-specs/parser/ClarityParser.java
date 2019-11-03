// Generated from Clarity.g4 by ANTLR 4.7.1
import org.antlr.v4.runtime.atn.*;
import org.antlr.v4.runtime.dfa.DFA;
import org.antlr.v4.runtime.*;
import org.antlr.v4.runtime.misc.*;
import org.antlr.v4.runtime.tree.*;
import java.util.List;
import java.util.Iterator;
import java.util.ArrayList;

@SuppressWarnings({"all", "warnings", "unchecked", "unused", "cast"})
public class ClarityParser extends Parser {
	static { RuntimeMetaData.checkVersion("4.7.1", RuntimeMetaData.VERSION); }

	protected static final DFA[] _decisionToDFA;
	protected static final PredictionContextCache _sharedContextCache =
		new PredictionContextCache();
	public static final int
		T__0=1, T__1=2, T__2=3, T__3=4, T__4=5, T__5=6, T__6=7, T__7=8, T__8=9, 
		T__9=10, T__10=11, Letter=12, String=13, WS=14, Digit=15;
	public static final int
		RULE_r = 0, RULE_integer = 1, RULE_identifier = 2, RULE_module = 3, RULE_accessor = 4, 
		RULE_call = 5, RULE_value = 6, RULE_type = 7, RULE_tuple = 8, RULE_tupleInstance = 9, 
		RULE_struct = 10, RULE_structInstance = 11, RULE_function = 12, RULE_assignment = 13, 
		RULE_ret = 14;
	public static final String[] ruleNames = {
		"r", "integer", "identifier", "module", "accessor", "call", "value", "type", 
		"tuple", "tupleInstance", "struct", "structInstance", "function", "assignment", 
		"ret"
	};

	private static final String[] _LITERAL_NAMES = {
		null, "'{'", "'}'", "'['", "']'", "'('", "':'", "','", "')'", "'<-'", 
		"';'", "'return'"
	};
	private static final String[] _SYMBOLIC_NAMES = {
		null, null, null, null, null, null, null, null, null, null, null, null, 
		"Letter", "String", "WS", "Digit"
	};
	public static final Vocabulary VOCABULARY = new VocabularyImpl(_LITERAL_NAMES, _SYMBOLIC_NAMES);

	/**
	 * @deprecated Use {@link #VOCABULARY} instead.
	 */
	@Deprecated
	public static final String[] tokenNames;
	static {
		tokenNames = new String[_SYMBOLIC_NAMES.length];
		for (int i = 0; i < tokenNames.length; i++) {
			tokenNames[i] = VOCABULARY.getLiteralName(i);
			if (tokenNames[i] == null) {
				tokenNames[i] = VOCABULARY.getSymbolicName(i);
			}

			if (tokenNames[i] == null) {
				tokenNames[i] = "<INVALID>";
			}
		}
	}

	@Override
	@Deprecated
	public String[] getTokenNames() {
		return tokenNames;
	}

	@Override

	public Vocabulary getVocabulary() {
		return VOCABULARY;
	}

	@Override
	public String getGrammarFileName() { return "Clarity.g4"; }

	@Override
	public String[] getRuleNames() { return ruleNames; }

	@Override
	public String getSerializedATN() { return _serializedATN; }

	@Override
	public ATN getATN() { return _ATN; }

	public ClarityParser(TokenStream input) {
		super(input);
		_interp = new ParserATNSimulator(this,_ATN,_decisionToDFA,_sharedContextCache);
	}
	public static class RContext extends ParserRuleContext {
		public ModuleContext module() {
			return getRuleContext(ModuleContext.class,0);
		}
		public RContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_r; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterR(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitR(this);
		}
	}

	public final RContext r() throws RecognitionException {
		RContext _localctx = new RContext(_ctx, getState());
		enterRule(_localctx, 0, RULE_r);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(30);
			module();
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IntegerContext extends ParserRuleContext {
		public List<TerminalNode> Digit() { return getTokens(ClarityParser.Digit); }
		public TerminalNode Digit(int i) {
			return getToken(ClarityParser.Digit, i);
		}
		public IntegerContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_integer; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterInteger(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitInteger(this);
		}
	}

	public final IntegerContext integer() throws RecognitionException {
		IntegerContext _localctx = new IntegerContext(_ctx, getState());
		enterRule(_localctx, 2, RULE_integer);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(33); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(32);
				match(Digit);
				}
				}
				setState(35); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==Digit );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class IdentifierContext extends ParserRuleContext {
		public List<TerminalNode> Digit() { return getTokens(ClarityParser.Digit); }
		public TerminalNode Digit(int i) {
			return getToken(ClarityParser.Digit, i);
		}
		public List<TerminalNode> Letter() { return getTokens(ClarityParser.Letter); }
		public TerminalNode Letter(int i) {
			return getToken(ClarityParser.Letter, i);
		}
		public IdentifierContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_identifier; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterIdentifier(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitIdentifier(this);
		}
	}

	public final IdentifierContext identifier() throws RecognitionException {
		IdentifierContext _localctx = new IdentifierContext(_ctx, getState());
		enterRule(_localctx, 4, RULE_identifier);
		int _la;
		try {
			int _alt;
			enterOuterAlt(_localctx, 1);
			{
			setState(38); 
			_errHandler.sync(this);
			_alt = 1;
			do {
				switch (_alt) {
				case 1:
					{
					{
					setState(37);
					_la = _input.LA(1);
					if ( !(_la==Letter || _la==Digit) ) {
					_errHandler.recoverInline(this);
					}
					else {
						if ( _input.LA(1)==Token.EOF ) matchedEOF = true;
						_errHandler.reportMatch(this);
						consume();
					}
					}
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(40); 
				_errHandler.sync(this);
				_alt = getInterpreter().adaptivePredict(_input,1,_ctx);
			} while ( _alt!=2 && _alt!=org.antlr.v4.runtime.atn.ATN.INVALID_ALT_NUMBER );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ModuleContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public TerminalNode String() { return getToken(ClarityParser.String, 0); }
		public List<FunctionContext> function() {
			return getRuleContexts(FunctionContext.class);
		}
		public FunctionContext function(int i) {
			return getRuleContext(FunctionContext.class,i);
		}
		public List<TypeContext> type() {
			return getRuleContexts(TypeContext.class);
		}
		public TypeContext type(int i) {
			return getRuleContext(TypeContext.class,i);
		}
		public List<ModuleContext> module() {
			return getRuleContexts(ModuleContext.class);
		}
		public ModuleContext module(int i) {
			return getRuleContext(ModuleContext.class,i);
		}
		public ModuleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_module; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterModule(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitModule(this);
		}
	}

	public final ModuleContext module() throws RecognitionException {
		ModuleContext _localctx = new ModuleContext(_ctx, getState());
		enterRule(_localctx, 6, RULE_module);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(42);
			identifier();
			setState(43);
			match(WS);
			setState(44);
			identifier();
			setState(45);
			match(WS);
			setState(46);
			match(String);
			setState(47);
			match(WS);
			setState(48);
			match(T__0);
			setState(49);
			match(WS);
			setState(59); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(59);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,2,_ctx) ) {
				case 1:
					{
					{
					setState(50);
					function();
					setState(51);
					match(WS);
					}
					}
					break;
				case 2:
					{
					{
					setState(53);
					type();
					setState(54);
					match(WS);
					}
					}
					break;
				case 3:
					{
					{
					setState(56);
					module();
					setState(57);
					match(WS);
					}
					}
					break;
				}
				}
				setState(61); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==Letter || _la==Digit );
			setState(63);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AccessorContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public List<IntegerContext> integer() {
			return getRuleContexts(IntegerContext.class);
		}
		public IntegerContext integer(int i) {
			return getRuleContext(IntegerContext.class,i);
		}
		public List<TerminalNode> String() { return getTokens(ClarityParser.String); }
		public TerminalNode String(int i) {
			return getToken(ClarityParser.String, i);
		}
		public AccessorContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_accessor; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterAccessor(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitAccessor(this);
		}
	}

	public final AccessorContext accessor() throws RecognitionException {
		AccessorContext _localctx = new AccessorContext(_ctx, getState());
		enterRule(_localctx, 8, RULE_accessor);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(65);
			identifier();
			setState(72); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(66);
				match(T__2);
				setState(69);
				_errHandler.sync(this);
				switch (_input.LA(1)) {
				case Digit:
					{
					setState(67);
					integer();
					}
					break;
				case String:
					{
					setState(68);
					match(String);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				setState(71);
				match(T__3);
				}
				}
				setState(74); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__2 );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class CallContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public CallContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_call; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterCall(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitCall(this);
		}
	}

	public final CallContext call() throws RecognitionException {
		CallContext _localctx = new CallContext(_ctx, getState());
		enterRule(_localctx, 10, RULE_call);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(76);
			identifier();
			setState(80);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(77);
				match(WS);
				}
				}
				setState(82);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(83);
			match(T__4);
			setState(84);
			identifier();
			setState(88);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(85);
				match(WS);
				}
				}
				setState(90);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(91);
			match(T__5);
			setState(95);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(92);
				match(WS);
				}
				}
				setState(97);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(98);
			value();
			setState(102);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(99);
				match(WS);
				}
				}
				setState(104);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(133); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(105);
				match(T__6);
				setState(109);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(106);
					match(WS);
					}
					}
					setState(111);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(112);
				identifier();
				setState(116);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(113);
					match(WS);
					}
					}
					setState(118);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(119);
				match(T__5);
				setState(123);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(120);
					match(WS);
					}
					}
					setState(125);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(126);
				value();
				setState(130);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(127);
					match(WS);
					}
					}
					setState(132);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(135); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(137);
			match(T__7);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class ValueContext extends ParserRuleContext {
		public IdentifierContext identifier() {
			return getRuleContext(IdentifierContext.class,0);
		}
		public CallContext call() {
			return getRuleContext(CallContext.class,0);
		}
		public TupleInstanceContext tupleInstance() {
			return getRuleContext(TupleInstanceContext.class,0);
		}
		public StructInstanceContext structInstance() {
			return getRuleContext(StructInstanceContext.class,0);
		}
		public List<AccessorContext> accessor() {
			return getRuleContexts(AccessorContext.class);
		}
		public AccessorContext accessor(int i) {
			return getRuleContext(AccessorContext.class,i);
		}
		public ValueContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_value; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterValue(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitValue(this);
		}
	}

	public final ValueContext value() throws RecognitionException {
		ValueContext _localctx = new ValueContext(_ctx, getState());
		enterRule(_localctx, 12, RULE_value);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(143);
			_errHandler.sync(this);
			switch ( getInterpreter().adaptivePredict(_input,15,_ctx) ) {
			case 1:
				{
				setState(139);
				identifier();
				}
				break;
			case 2:
				{
				setState(140);
				call();
				}
				break;
			case 3:
				{
				setState(141);
				tupleInstance();
				}
				break;
			case 4:
				{
				setState(142);
				structInstance();
				}
				break;
			}
			setState(148);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==Letter || _la==Digit) {
				{
				{
				setState(145);
				accessor();
				}
				}
				setState(150);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TypeContext extends ParserRuleContext {
		public List<TupleContext> tuple() {
			return getRuleContexts(TupleContext.class);
		}
		public TupleContext tuple(int i) {
			return getRuleContext(TupleContext.class,i);
		}
		public List<StructContext> struct() {
			return getRuleContexts(StructContext.class);
		}
		public StructContext struct(int i) {
			return getRuleContext(StructContext.class,i);
		}
		public TypeContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_type; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterType(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitType(this);
		}
	}

	public final TypeContext type() throws RecognitionException {
		TypeContext _localctx = new TypeContext(_ctx, getState());
		enterRule(_localctx, 14, RULE_type);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(153); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				setState(153);
				_errHandler.sync(this);
				switch ( getInterpreter().adaptivePredict(_input,17,_ctx) ) {
				case 1:
					{
					setState(151);
					tuple();
					}
					break;
				case 2:
					{
					setState(152);
					struct();
					}
					break;
				}
				}
				setState(155); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==Letter || _la==Digit );
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TupleContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public TerminalNode String() { return getToken(ClarityParser.String, 0); }
		public TupleContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tuple; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterTuple(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitTuple(this);
		}
	}

	public final TupleContext tuple() throws RecognitionException {
		TupleContext _localctx = new TupleContext(_ctx, getState());
		enterRule(_localctx, 16, RULE_tuple);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(157);
			identifier();
			setState(158);
			match(WS);
			setState(159);
			identifier();
			setState(160);
			match(WS);
			setState(161);
			match(String);
			setState(162);
			match(WS);
			setState(163);
			match(T__4);
			setState(167);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(164);
				match(WS);
				}
				}
				setState(169);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(170);
			identifier();
			setState(174);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(171);
				match(WS);
				}
				}
				setState(176);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(191); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(177);
				match(T__6);
				setState(181);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(178);
					match(WS);
					}
					}
					setState(183);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(184);
				identifier();
				setState(188);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(185);
					match(WS);
					}
					}
					setState(190);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(193); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(195);
			match(T__7);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class TupleInstanceContext extends ParserRuleContext {
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public TupleInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_tupleInstance; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterTupleInstance(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitTupleInstance(this);
		}
	}

	public final TupleInstanceContext tupleInstance() throws RecognitionException {
		TupleInstanceContext _localctx = new TupleInstanceContext(_ctx, getState());
		enterRule(_localctx, 18, RULE_tupleInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(197);
			match(T__4);
			setState(201);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(198);
				match(WS);
				}
				}
				setState(203);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(204);
			value();
			setState(208);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(205);
				match(WS);
				}
				}
				setState(210);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(225); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(211);
				match(T__6);
				setState(215);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(212);
					match(WS);
					}
					}
					setState(217);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(218);
				value();
				setState(222);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(219);
					match(WS);
					}
					}
					setState(224);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(227); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(229);
			match(T__7);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StructContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public TerminalNode String() { return getToken(ClarityParser.String, 0); }
		public StructContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_struct; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterStruct(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitStruct(this);
		}
	}

	public final StructContext struct() throws RecognitionException {
		StructContext _localctx = new StructContext(_ctx, getState());
		enterRule(_localctx, 20, RULE_struct);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(231);
			identifier();
			setState(232);
			match(WS);
			setState(233);
			identifier();
			setState(234);
			match(WS);
			setState(235);
			match(String);
			setState(236);
			match(WS);
			setState(237);
			match(T__0);
			setState(241);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(238);
				match(WS);
				}
				}
				setState(243);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(244);
			identifier();
			setState(248);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(245);
				match(WS);
				}
				}
				setState(250);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(251);
			match(T__5);
			setState(255);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(252);
				match(WS);
				}
				}
				setState(257);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(258);
			identifier();
			setState(287); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(259);
				match(T__6);
				setState(263);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(260);
					match(WS);
					}
					}
					setState(265);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(266);
				identifier();
				setState(270);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(267);
					match(WS);
					}
					}
					setState(272);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(273);
				match(T__5);
				setState(277);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(274);
					match(WS);
					}
					}
					setState(279);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(280);
				identifier();
				setState(284);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(281);
					match(WS);
					}
					}
					setState(286);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(289); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(291);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class StructInstanceContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<ValueContext> value() {
			return getRuleContexts(ValueContext.class);
		}
		public ValueContext value(int i) {
			return getRuleContext(ValueContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public StructInstanceContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_structInstance; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterStructInstance(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitStructInstance(this);
		}
	}

	public final StructInstanceContext structInstance() throws RecognitionException {
		StructInstanceContext _localctx = new StructInstanceContext(_ctx, getState());
		enterRule(_localctx, 22, RULE_structInstance);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(293);
			match(T__0);
			setState(297);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(294);
				match(WS);
				}
				}
				setState(299);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(300);
			identifier();
			setState(304);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(301);
				match(WS);
				}
				}
				setState(306);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(307);
			match(T__5);
			setState(311);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(308);
				match(WS);
				}
				}
				setState(313);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(314);
			value();
			setState(343); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(315);
				match(T__6);
				setState(319);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(316);
					match(WS);
					}
					}
					setState(321);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(322);
				identifier();
				setState(326);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(323);
					match(WS);
					}
					}
					setState(328);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(329);
				match(T__5);
				setState(333);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(330);
					match(WS);
					}
					}
					setState(335);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(336);
				value();
				setState(340);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(337);
					match(WS);
					}
					}
					setState(342);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(345); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(347);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class FunctionContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public TerminalNode String() { return getToken(ClarityParser.String, 0); }
		public RetContext ret() {
			return getRuleContext(RetContext.class,0);
		}
		public List<AssignmentContext> assignment() {
			return getRuleContexts(AssignmentContext.class);
		}
		public AssignmentContext assignment(int i) {
			return getRuleContext(AssignmentContext.class,i);
		}
		public FunctionContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_function; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterFunction(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitFunction(this);
		}
	}

	public final FunctionContext function() throws RecognitionException {
		FunctionContext _localctx = new FunctionContext(_ctx, getState());
		enterRule(_localctx, 24, RULE_function);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(349);
			identifier();
			setState(350);
			match(WS);
			setState(351);
			identifier();
			setState(352);
			match(WS);
			setState(353);
			identifier();
			setState(354);
			match(WS);
			setState(355);
			match(String);
			setState(356);
			match(WS);
			setState(357);
			match(T__4);
			setState(358);
			identifier();
			setState(359);
			match(WS);
			setState(360);
			identifier();
			setState(364);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(361);
				match(WS);
				}
				}
				setState(366);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(383); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(367);
				match(T__6);
				setState(371);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(368);
					match(WS);
					}
					}
					setState(373);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				setState(374);
				identifier();
				setState(375);
				match(WS);
				setState(376);
				identifier();
				setState(380);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(377);
					match(WS);
					}
					}
					setState(382);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(385); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==T__6 );
			setState(387);
			match(T__7);
			setState(391);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(388);
				match(WS);
				}
				}
				setState(393);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(394);
			match(T__0);
			setState(398);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(395);
				match(WS);
				}
				}
				setState(400);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(408); 
			_errHandler.sync(this);
			_la = _input.LA(1);
			do {
				{
				{
				setState(401);
				assignment();
				setState(405);
				_errHandler.sync(this);
				_la = _input.LA(1);
				while (_la==WS) {
					{
					{
					setState(402);
					match(WS);
					}
					}
					setState(407);
					_errHandler.sync(this);
					_la = _input.LA(1);
				}
				}
				}
				setState(410); 
				_errHandler.sync(this);
				_la = _input.LA(1);
			} while ( _la==Letter || _la==Digit );
			setState(412);
			ret();
			setState(416);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(413);
				match(WS);
				}
				}
				setState(418);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(419);
			match(T__1);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class AssignmentContext extends ParserRuleContext {
		public List<IdentifierContext> identifier() {
			return getRuleContexts(IdentifierContext.class);
		}
		public IdentifierContext identifier(int i) {
			return getRuleContext(IdentifierContext.class,i);
		}
		public List<TerminalNode> WS() { return getTokens(ClarityParser.WS); }
		public TerminalNode WS(int i) {
			return getToken(ClarityParser.WS, i);
		}
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public AssignmentContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_assignment; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterAssignment(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitAssignment(this);
		}
	}

	public final AssignmentContext assignment() throws RecognitionException {
		AssignmentContext _localctx = new AssignmentContext(_ctx, getState());
		enterRule(_localctx, 26, RULE_assignment);
		int _la;
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(421);
			identifier();
			setState(422);
			match(WS);
			setState(423);
			identifier();
			setState(427);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(424);
				match(WS);
				}
				}
				setState(429);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(430);
			match(T__8);
			setState(434);
			_errHandler.sync(this);
			_la = _input.LA(1);
			while (_la==WS) {
				{
				{
				setState(431);
				match(WS);
				}
				}
				setState(436);
				_errHandler.sync(this);
				_la = _input.LA(1);
			}
			setState(437);
			value();
			setState(438);
			match(T__9);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static class RetContext extends ParserRuleContext {
		public TerminalNode WS() { return getToken(ClarityParser.WS, 0); }
		public ValueContext value() {
			return getRuleContext(ValueContext.class,0);
		}
		public RetContext(ParserRuleContext parent, int invokingState) {
			super(parent, invokingState);
		}
		@Override public int getRuleIndex() { return RULE_ret; }
		@Override
		public void enterRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).enterRet(this);
		}
		@Override
		public void exitRule(ParseTreeListener listener) {
			if ( listener instanceof ClarityListener ) ((ClarityListener)listener).exitRet(this);
		}
	}

	public final RetContext ret() throws RecognitionException {
		RetContext _localctx = new RetContext(_ctx, getState());
		enterRule(_localctx, 28, RULE_ret);
		try {
			enterOuterAlt(_localctx, 1);
			{
			setState(440);
			match(T__10);
			setState(441);
			match(WS);
			setState(442);
			value();
			setState(443);
			match(T__9);
			}
		}
		catch (RecognitionException re) {
			_localctx.exception = re;
			_errHandler.reportError(this, re);
			_errHandler.recover(this, re);
		}
		finally {
			exitRule();
		}
		return _localctx;
	}

	public static final String _serializedATN =
		"\3\u608b\ua72a\u8133\ub9ed\u417c\u3be7\u7786\u5964\3\21\u01c0\4\2\t\2"+
		"\4\3\t\3\4\4\t\4\4\5\t\5\4\6\t\6\4\7\t\7\4\b\t\b\4\t\t\t\4\n\t\n\4\13"+
		"\t\13\4\f\t\f\4\r\t\r\4\16\t\16\4\17\t\17\4\20\t\20\3\2\3\2\3\3\6\3$\n"+
		"\3\r\3\16\3%\3\4\6\4)\n\4\r\4\16\4*\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3"+
		"\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\3\5\6\5>\n\5\r\5\16\5?\3\5\3\5\3\6\3\6"+
		"\3\6\3\6\5\6H\n\6\3\6\6\6K\n\6\r\6\16\6L\3\7\3\7\7\7Q\n\7\f\7\16\7T\13"+
		"\7\3\7\3\7\3\7\7\7Y\n\7\f\7\16\7\\\13\7\3\7\3\7\7\7`\n\7\f\7\16\7c\13"+
		"\7\3\7\3\7\7\7g\n\7\f\7\16\7j\13\7\3\7\3\7\7\7n\n\7\f\7\16\7q\13\7\3\7"+
		"\3\7\7\7u\n\7\f\7\16\7x\13\7\3\7\3\7\7\7|\n\7\f\7\16\7\177\13\7\3\7\3"+
		"\7\7\7\u0083\n\7\f\7\16\7\u0086\13\7\6\7\u0088\n\7\r\7\16\7\u0089\3\7"+
		"\3\7\3\b\3\b\3\b\3\b\5\b\u0092\n\b\3\b\7\b\u0095\n\b\f\b\16\b\u0098\13"+
		"\b\3\t\3\t\6\t\u009c\n\t\r\t\16\t\u009d\3\n\3\n\3\n\3\n\3\n\3\n\3\n\3"+
		"\n\7\n\u00a8\n\n\f\n\16\n\u00ab\13\n\3\n\3\n\7\n\u00af\n\n\f\n\16\n\u00b2"+
		"\13\n\3\n\3\n\7\n\u00b6\n\n\f\n\16\n\u00b9\13\n\3\n\3\n\7\n\u00bd\n\n"+
		"\f\n\16\n\u00c0\13\n\6\n\u00c2\n\n\r\n\16\n\u00c3\3\n\3\n\3\13\3\13\7"+
		"\13\u00ca\n\13\f\13\16\13\u00cd\13\13\3\13\3\13\7\13\u00d1\n\13\f\13\16"+
		"\13\u00d4\13\13\3\13\3\13\7\13\u00d8\n\13\f\13\16\13\u00db\13\13\3\13"+
		"\3\13\7\13\u00df\n\13\f\13\16\13\u00e2\13\13\6\13\u00e4\n\13\r\13\16\13"+
		"\u00e5\3\13\3\13\3\f\3\f\3\f\3\f\3\f\3\f\3\f\3\f\7\f\u00f2\n\f\f\f\16"+
		"\f\u00f5\13\f\3\f\3\f\7\f\u00f9\n\f\f\f\16\f\u00fc\13\f\3\f\3\f\7\f\u0100"+
		"\n\f\f\f\16\f\u0103\13\f\3\f\3\f\3\f\7\f\u0108\n\f\f\f\16\f\u010b\13\f"+
		"\3\f\3\f\7\f\u010f\n\f\f\f\16\f\u0112\13\f\3\f\3\f\7\f\u0116\n\f\f\f\16"+
		"\f\u0119\13\f\3\f\3\f\7\f\u011d\n\f\f\f\16\f\u0120\13\f\6\f\u0122\n\f"+
		"\r\f\16\f\u0123\3\f\3\f\3\r\3\r\7\r\u012a\n\r\f\r\16\r\u012d\13\r\3\r"+
		"\3\r\7\r\u0131\n\r\f\r\16\r\u0134\13\r\3\r\3\r\7\r\u0138\n\r\f\r\16\r"+
		"\u013b\13\r\3\r\3\r\3\r\7\r\u0140\n\r\f\r\16\r\u0143\13\r\3\r\3\r\7\r"+
		"\u0147\n\r\f\r\16\r\u014a\13\r\3\r\3\r\7\r\u014e\n\r\f\r\16\r\u0151\13"+
		"\r\3\r\3\r\7\r\u0155\n\r\f\r\16\r\u0158\13\r\6\r\u015a\n\r\r\r\16\r\u015b"+
		"\3\r\3\r\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3\16\3"+
		"\16\7\16\u016d\n\16\f\16\16\16\u0170\13\16\3\16\3\16\7\16\u0174\n\16\f"+
		"\16\16\16\u0177\13\16\3\16\3\16\3\16\3\16\7\16\u017d\n\16\f\16\16\16\u0180"+
		"\13\16\6\16\u0182\n\16\r\16\16\16\u0183\3\16\3\16\7\16\u0188\n\16\f\16"+
		"\16\16\u018b\13\16\3\16\3\16\7\16\u018f\n\16\f\16\16\16\u0192\13\16\3"+
		"\16\3\16\7\16\u0196\n\16\f\16\16\16\u0199\13\16\6\16\u019b\n\16\r\16\16"+
		"\16\u019c\3\16\3\16\7\16\u01a1\n\16\f\16\16\16\u01a4\13\16\3\16\3\16\3"+
		"\17\3\17\3\17\3\17\7\17\u01ac\n\17\f\17\16\17\u01af\13\17\3\17\3\17\7"+
		"\17\u01b3\n\17\f\17\16\17\u01b6\13\17\3\17\3\17\3\17\3\20\3\20\3\20\3"+
		"\20\3\20\3\20\2\2\21\2\4\6\b\n\f\16\20\22\24\26\30\32\34\36\2\3\4\2\16"+
		"\16\21\21\2\u01eb\2 \3\2\2\2\4#\3\2\2\2\6(\3\2\2\2\b,\3\2\2\2\nC\3\2\2"+
		"\2\fN\3\2\2\2\16\u0091\3\2\2\2\20\u009b\3\2\2\2\22\u009f\3\2\2\2\24\u00c7"+
		"\3\2\2\2\26\u00e9\3\2\2\2\30\u0127\3\2\2\2\32\u015f\3\2\2\2\34\u01a7\3"+
		"\2\2\2\36\u01ba\3\2\2\2 !\5\b\5\2!\3\3\2\2\2\"$\7\21\2\2#\"\3\2\2\2$%"+
		"\3\2\2\2%#\3\2\2\2%&\3\2\2\2&\5\3\2\2\2\')\t\2\2\2(\'\3\2\2\2)*\3\2\2"+
		"\2*(\3\2\2\2*+\3\2\2\2+\7\3\2\2\2,-\5\6\4\2-.\7\20\2\2./\5\6\4\2/\60\7"+
		"\20\2\2\60\61\7\17\2\2\61\62\7\20\2\2\62\63\7\3\2\2\63=\7\20\2\2\64\65"+
		"\5\32\16\2\65\66\7\20\2\2\66>\3\2\2\2\678\5\20\t\289\7\20\2\29>\3\2\2"+
		"\2:;\5\b\5\2;<\7\20\2\2<>\3\2\2\2=\64\3\2\2\2=\67\3\2\2\2=:\3\2\2\2>?"+
		"\3\2\2\2?=\3\2\2\2?@\3\2\2\2@A\3\2\2\2AB\7\4\2\2B\t\3\2\2\2CJ\5\6\4\2"+
		"DG\7\5\2\2EH\5\4\3\2FH\7\17\2\2GE\3\2\2\2GF\3\2\2\2HI\3\2\2\2IK\7\6\2"+
		"\2JD\3\2\2\2KL\3\2\2\2LJ\3\2\2\2LM\3\2\2\2M\13\3\2\2\2NR\5\6\4\2OQ\7\20"+
		"\2\2PO\3\2\2\2QT\3\2\2\2RP\3\2\2\2RS\3\2\2\2SU\3\2\2\2TR\3\2\2\2UV\7\7"+
		"\2\2VZ\5\6\4\2WY\7\20\2\2XW\3\2\2\2Y\\\3\2\2\2ZX\3\2\2\2Z[\3\2\2\2[]\3"+
		"\2\2\2\\Z\3\2\2\2]a\7\b\2\2^`\7\20\2\2_^\3\2\2\2`c\3\2\2\2a_\3\2\2\2a"+
		"b\3\2\2\2bd\3\2\2\2ca\3\2\2\2dh\5\16\b\2eg\7\20\2\2fe\3\2\2\2gj\3\2\2"+
		"\2hf\3\2\2\2hi\3\2\2\2i\u0087\3\2\2\2jh\3\2\2\2ko\7\t\2\2ln\7\20\2\2m"+
		"l\3\2\2\2nq\3\2\2\2om\3\2\2\2op\3\2\2\2pr\3\2\2\2qo\3\2\2\2rv\5\6\4\2"+
		"su\7\20\2\2ts\3\2\2\2ux\3\2\2\2vt\3\2\2\2vw\3\2\2\2wy\3\2\2\2xv\3\2\2"+
		"\2y}\7\b\2\2z|\7\20\2\2{z\3\2\2\2|\177\3\2\2\2}{\3\2\2\2}~\3\2\2\2~\u0080"+
		"\3\2\2\2\177}\3\2\2\2\u0080\u0084\5\16\b\2\u0081\u0083\7\20\2\2\u0082"+
		"\u0081\3\2\2\2\u0083\u0086\3\2\2\2\u0084\u0082\3\2\2\2\u0084\u0085\3\2"+
		"\2\2\u0085\u0088\3\2\2\2\u0086\u0084\3\2\2\2\u0087k\3\2\2\2\u0088\u0089"+
		"\3\2\2\2\u0089\u0087\3\2\2\2\u0089\u008a\3\2\2\2\u008a\u008b\3\2\2\2\u008b"+
		"\u008c\7\n\2\2\u008c\r\3\2\2\2\u008d\u0092\5\6\4\2\u008e\u0092\5\f\7\2"+
		"\u008f\u0092\5\24\13\2\u0090\u0092\5\30\r\2\u0091\u008d\3\2\2\2\u0091"+
		"\u008e\3\2\2\2\u0091\u008f\3\2\2\2\u0091\u0090\3\2\2\2\u0092\u0096\3\2"+
		"\2\2\u0093\u0095\5\n\6\2\u0094\u0093\3\2\2\2\u0095\u0098\3\2\2\2\u0096"+
		"\u0094\3\2\2\2\u0096\u0097\3\2\2\2\u0097\17\3\2\2\2\u0098\u0096\3\2\2"+
		"\2\u0099\u009c\5\22\n\2\u009a\u009c\5\26\f\2\u009b\u0099\3\2\2\2\u009b"+
		"\u009a\3\2\2\2\u009c\u009d\3\2\2\2\u009d\u009b\3\2\2\2\u009d\u009e\3\2"+
		"\2\2\u009e\21\3\2\2\2\u009f\u00a0\5\6\4\2\u00a0\u00a1\7\20\2\2\u00a1\u00a2"+
		"\5\6\4\2\u00a2\u00a3\7\20\2\2\u00a3\u00a4\7\17\2\2\u00a4\u00a5\7\20\2"+
		"\2\u00a5\u00a9\7\7\2\2\u00a6\u00a8\7\20\2\2\u00a7\u00a6\3\2\2\2\u00a8"+
		"\u00ab\3\2\2\2\u00a9\u00a7\3\2\2\2\u00a9\u00aa\3\2\2\2\u00aa\u00ac\3\2"+
		"\2\2\u00ab\u00a9\3\2\2\2\u00ac\u00b0\5\6\4\2\u00ad\u00af\7\20\2\2\u00ae"+
		"\u00ad\3\2\2\2\u00af\u00b2\3\2\2\2\u00b0\u00ae\3\2\2\2\u00b0\u00b1\3\2"+
		"\2\2\u00b1\u00c1\3\2\2\2\u00b2\u00b0\3\2\2\2\u00b3\u00b7\7\t\2\2\u00b4"+
		"\u00b6\7\20\2\2\u00b5\u00b4\3\2\2\2\u00b6\u00b9\3\2\2\2\u00b7\u00b5\3"+
		"\2\2\2\u00b7\u00b8\3\2\2\2\u00b8\u00ba\3\2\2\2\u00b9\u00b7\3\2\2\2\u00ba"+
		"\u00be\5\6\4\2\u00bb\u00bd\7\20\2\2\u00bc\u00bb\3\2\2\2\u00bd\u00c0\3"+
		"\2\2\2\u00be\u00bc\3\2\2\2\u00be\u00bf\3\2\2\2\u00bf\u00c2\3\2\2\2\u00c0"+
		"\u00be\3\2\2\2\u00c1\u00b3\3\2\2\2\u00c2\u00c3\3\2\2\2\u00c3\u00c1\3\2"+
		"\2\2\u00c3\u00c4\3\2\2\2\u00c4\u00c5\3\2\2\2\u00c5\u00c6\7\n\2\2\u00c6"+
		"\23\3\2\2\2\u00c7\u00cb\7\7\2\2\u00c8\u00ca\7\20\2\2\u00c9\u00c8\3\2\2"+
		"\2\u00ca\u00cd\3\2\2\2\u00cb\u00c9\3\2\2\2\u00cb\u00cc\3\2\2\2\u00cc\u00ce"+
		"\3\2\2\2\u00cd\u00cb\3\2\2\2\u00ce\u00d2\5\16\b\2\u00cf\u00d1\7\20\2\2"+
		"\u00d0\u00cf\3\2\2\2\u00d1\u00d4\3\2\2\2\u00d2\u00d0\3\2\2\2\u00d2\u00d3"+
		"\3\2\2\2\u00d3\u00e3\3\2\2\2\u00d4\u00d2\3\2\2\2\u00d5\u00d9\7\t\2\2\u00d6"+
		"\u00d8\7\20\2\2\u00d7\u00d6\3\2\2\2\u00d8\u00db\3\2\2\2\u00d9\u00d7\3"+
		"\2\2\2\u00d9\u00da\3\2\2\2\u00da\u00dc\3\2\2\2\u00db\u00d9\3\2\2\2\u00dc"+
		"\u00e0\5\16\b\2\u00dd\u00df\7\20\2\2\u00de\u00dd\3\2\2\2\u00df\u00e2\3"+
		"\2\2\2\u00e0\u00de\3\2\2\2\u00e0\u00e1\3\2\2\2\u00e1\u00e4\3\2\2\2\u00e2"+
		"\u00e0\3\2\2\2\u00e3\u00d5\3\2\2\2\u00e4\u00e5\3\2\2\2\u00e5\u00e3\3\2"+
		"\2\2\u00e5\u00e6\3\2\2\2\u00e6\u00e7\3\2\2\2\u00e7\u00e8\7\n\2\2\u00e8"+
		"\25\3\2\2\2\u00e9\u00ea\5\6\4\2\u00ea\u00eb\7\20\2\2\u00eb\u00ec\5\6\4"+
		"\2\u00ec\u00ed\7\20\2\2\u00ed\u00ee\7\17\2\2\u00ee\u00ef\7\20\2\2\u00ef"+
		"\u00f3\7\3\2\2\u00f0\u00f2\7\20\2\2\u00f1\u00f0\3\2\2\2\u00f2\u00f5\3"+
		"\2\2\2\u00f3\u00f1\3\2\2\2\u00f3\u00f4\3\2\2\2\u00f4\u00f6\3\2\2\2\u00f5"+
		"\u00f3\3\2\2\2\u00f6\u00fa\5\6\4\2\u00f7\u00f9\7\20\2\2\u00f8\u00f7\3"+
		"\2\2\2\u00f9\u00fc\3\2\2\2\u00fa\u00f8\3\2\2\2\u00fa\u00fb\3\2\2\2\u00fb"+
		"\u00fd\3\2\2\2\u00fc\u00fa\3\2\2\2\u00fd\u0101\7\b\2\2\u00fe\u0100\7\20"+
		"\2\2\u00ff\u00fe\3\2\2\2\u0100\u0103\3\2\2\2\u0101\u00ff\3\2\2\2\u0101"+
		"\u0102\3\2\2\2\u0102\u0104\3\2\2\2\u0103\u0101\3\2\2\2\u0104\u0121\5\6"+
		"\4\2\u0105\u0109\7\t\2\2\u0106\u0108\7\20\2\2\u0107\u0106\3\2\2\2\u0108"+
		"\u010b\3\2\2\2\u0109\u0107\3\2\2\2\u0109\u010a\3\2\2\2\u010a\u010c\3\2"+
		"\2\2\u010b\u0109\3\2\2\2\u010c\u0110\5\6\4\2\u010d\u010f\7\20\2\2\u010e"+
		"\u010d\3\2\2\2\u010f\u0112\3\2\2\2\u0110\u010e\3\2\2\2\u0110\u0111\3\2"+
		"\2\2\u0111\u0113\3\2\2\2\u0112\u0110\3\2\2\2\u0113\u0117\7\b\2\2\u0114"+
		"\u0116\7\20\2\2\u0115\u0114\3\2\2\2\u0116\u0119\3\2\2\2\u0117\u0115\3"+
		"\2\2\2\u0117\u0118\3\2\2\2\u0118\u011a\3\2\2\2\u0119\u0117\3\2\2\2\u011a"+
		"\u011e\5\6\4\2\u011b\u011d\7\20\2\2\u011c\u011b\3\2\2\2\u011d\u0120\3"+
		"\2\2\2\u011e\u011c\3\2\2\2\u011e\u011f\3\2\2\2\u011f\u0122\3\2\2\2\u0120"+
		"\u011e\3\2\2\2\u0121\u0105\3\2\2\2\u0122\u0123\3\2\2\2\u0123\u0121\3\2"+
		"\2\2\u0123\u0124\3\2\2\2\u0124\u0125\3\2\2\2\u0125\u0126\7\4\2\2\u0126"+
		"\27\3\2\2\2\u0127\u012b\7\3\2\2\u0128\u012a\7\20\2\2\u0129\u0128\3\2\2"+
		"\2\u012a\u012d\3\2\2\2\u012b\u0129\3\2\2\2\u012b\u012c\3\2\2\2\u012c\u012e"+
		"\3\2\2\2\u012d\u012b\3\2\2\2\u012e\u0132\5\6\4\2\u012f\u0131\7\20\2\2"+
		"\u0130\u012f\3\2\2\2\u0131\u0134\3\2\2\2\u0132\u0130\3\2\2\2\u0132\u0133"+
		"\3\2\2\2\u0133\u0135\3\2\2\2\u0134\u0132\3\2\2\2\u0135\u0139\7\b\2\2\u0136"+
		"\u0138\7\20\2\2\u0137\u0136\3\2\2\2\u0138\u013b\3\2\2\2\u0139\u0137\3"+
		"\2\2\2\u0139\u013a\3\2\2\2\u013a\u013c\3\2\2\2\u013b\u0139\3\2\2\2\u013c"+
		"\u0159\5\16\b\2\u013d\u0141\7\t\2\2\u013e\u0140\7\20\2\2\u013f\u013e\3"+
		"\2\2\2\u0140\u0143\3\2\2\2\u0141\u013f\3\2\2\2\u0141\u0142\3\2\2\2\u0142"+
		"\u0144\3\2\2\2\u0143\u0141\3\2\2\2\u0144\u0148\5\6\4\2\u0145\u0147\7\20"+
		"\2\2\u0146\u0145\3\2\2\2\u0147\u014a\3\2\2\2\u0148\u0146\3\2\2\2\u0148"+
		"\u0149\3\2\2\2\u0149\u014b\3\2\2\2\u014a\u0148\3\2\2\2\u014b\u014f\7\b"+
		"\2\2\u014c\u014e\7\20\2\2\u014d\u014c\3\2\2\2\u014e\u0151\3\2\2\2\u014f"+
		"\u014d\3\2\2\2\u014f\u0150\3\2\2\2\u0150\u0152\3\2\2\2\u0151\u014f\3\2"+
		"\2\2\u0152\u0156\5\16\b\2\u0153\u0155\7\20\2\2\u0154\u0153\3\2\2\2\u0155"+
		"\u0158\3\2\2\2\u0156\u0154\3\2\2\2\u0156\u0157\3\2\2\2\u0157\u015a\3\2"+
		"\2\2\u0158\u0156\3\2\2\2\u0159\u013d\3\2\2\2\u015a\u015b\3\2\2\2\u015b"+
		"\u0159\3\2\2\2\u015b\u015c\3\2\2\2\u015c\u015d\3\2\2\2\u015d\u015e\7\4"+
		"\2\2\u015e\31\3\2\2\2\u015f\u0160\5\6\4\2\u0160\u0161\7\20\2\2\u0161\u0162"+
		"\5\6\4\2\u0162\u0163\7\20\2\2\u0163\u0164\5\6\4\2\u0164\u0165\7\20\2\2"+
		"\u0165\u0166\7\17\2\2\u0166\u0167\7\20\2\2\u0167\u0168\7\7\2\2\u0168\u0169"+
		"\5\6\4\2\u0169\u016a\7\20\2\2\u016a\u016e\5\6\4\2\u016b\u016d\7\20\2\2"+
		"\u016c\u016b\3\2\2\2\u016d\u0170\3\2\2\2\u016e\u016c\3\2\2\2\u016e\u016f"+
		"\3\2\2\2\u016f\u0181\3\2\2\2\u0170\u016e\3\2\2\2\u0171\u0175\7\t\2\2\u0172"+
		"\u0174\7\20\2\2\u0173\u0172\3\2\2\2\u0174\u0177\3\2\2\2\u0175\u0173\3"+
		"\2\2\2\u0175\u0176\3\2\2\2\u0176\u0178\3\2\2\2\u0177\u0175\3\2\2\2\u0178"+
		"\u0179\5\6\4\2\u0179\u017a\7\20\2\2\u017a\u017e\5\6\4\2\u017b\u017d\7"+
		"\20\2\2\u017c\u017b\3\2\2\2\u017d\u0180\3\2\2\2\u017e\u017c\3\2\2\2\u017e"+
		"\u017f\3\2\2\2\u017f\u0182\3\2\2\2\u0180\u017e\3\2\2\2\u0181\u0171\3\2"+
		"\2\2\u0182\u0183\3\2\2\2\u0183\u0181\3\2\2\2\u0183\u0184\3\2\2\2\u0184"+
		"\u0185\3\2\2\2\u0185\u0189\7\n\2\2\u0186\u0188\7\20\2\2\u0187\u0186\3"+
		"\2\2\2\u0188\u018b\3\2\2\2\u0189\u0187\3\2\2\2\u0189\u018a\3\2\2\2\u018a"+
		"\u018c\3\2\2\2\u018b\u0189\3\2\2\2\u018c\u0190\7\3\2\2\u018d\u018f\7\20"+
		"\2\2\u018e\u018d\3\2\2\2\u018f\u0192\3\2\2\2\u0190\u018e\3\2\2\2\u0190"+
		"\u0191\3\2\2\2\u0191\u019a\3\2\2\2\u0192\u0190\3\2\2\2\u0193\u0197\5\34"+
		"\17\2\u0194\u0196\7\20\2\2\u0195\u0194\3\2\2\2\u0196\u0199\3\2\2\2\u0197"+
		"\u0195\3\2\2\2\u0197\u0198\3\2\2\2\u0198\u019b\3\2\2\2\u0199\u0197\3\2"+
		"\2\2\u019a\u0193\3\2\2\2\u019b\u019c\3\2\2\2\u019c\u019a\3\2\2\2\u019c"+
		"\u019d\3\2\2\2\u019d\u019e\3\2\2\2\u019e\u01a2\5\36\20\2\u019f\u01a1\7"+
		"\20\2\2\u01a0\u019f\3\2\2\2\u01a1\u01a4\3\2\2\2\u01a2\u01a0\3\2\2\2\u01a2"+
		"\u01a3\3\2\2\2\u01a3\u01a5\3\2\2\2\u01a4\u01a2\3\2\2\2\u01a5\u01a6\7\4"+
		"\2\2\u01a6\33\3\2\2\2\u01a7\u01a8\5\6\4\2\u01a8\u01a9\7\20\2\2\u01a9\u01ad"+
		"\5\6\4\2\u01aa\u01ac\7\20\2\2\u01ab\u01aa\3\2\2\2\u01ac\u01af\3\2\2\2"+
		"\u01ad\u01ab\3\2\2\2\u01ad\u01ae\3\2\2\2\u01ae\u01b0\3\2\2\2\u01af\u01ad"+
		"\3\2\2\2\u01b0\u01b4\7\13\2\2\u01b1\u01b3\7\20\2\2\u01b2\u01b1\3\2\2\2"+
		"\u01b3\u01b6\3\2\2\2\u01b4\u01b2\3\2\2\2\u01b4\u01b5\3\2\2\2\u01b5\u01b7"+
		"\3\2\2\2\u01b6\u01b4\3\2\2\2\u01b7\u01b8\5\16\b\2\u01b8\u01b9\7\f\2\2"+
		"\u01b9\35\3\2\2\2\u01ba\u01bb\7\r\2\2\u01bb\u01bc\7\20\2\2\u01bc\u01bd"+
		"\5\16\b\2\u01bd\u01be\7\f\2\2\u01be\37\3\2\2\2:%*=?GLRZahov}\u0084\u0089"+
		"\u0091\u0096\u009b\u009d\u00a9\u00b0\u00b7\u00be\u00c3\u00cb\u00d2\u00d9"+
		"\u00e0\u00e5\u00f3\u00fa\u0101\u0109\u0110\u0117\u011e\u0123\u012b\u0132"+
		"\u0139\u0141\u0148\u014f\u0156\u015b\u016e\u0175\u017e\u0183\u0189\u0190"+
		"\u0197\u019c\u01a2\u01ad\u01b4";
	public static final ATN _ATN =
		new ATNDeserializer().deserialize(_serializedATN.toCharArray());
	static {
		_decisionToDFA = new DFA[_ATN.getNumberOfDecisions()];
		for (int i = 0; i < _ATN.getNumberOfDecisions(); i++) {
			_decisionToDFA[i] = new DFA(_ATN.getDecisionState(i), i);
		}
	}
}