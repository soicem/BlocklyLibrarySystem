# BlocklyLibrarySystem

step 1. 1번 function import
step 2. library function을 이용하여 program 작성(단순 출력 코드-> 복잡한 프로그램은 테스트 필요)
step 3. "To Python" button으로 실행

1. 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <variables>
    <variable type="" id="0!CFy7c.vOgq=c|{eXZU">argA</variable>
    <variable type="" id="iPCMIxnIH8L:v8.1n[;O">argB</variable>
  </variables>
  <block type="procedures_defreturn" id="$Nh$Du0{-Qa=~I|lKI.c" x="238" y="38">
    <mutation>
      <arg name="argA" varid="0!CFy7c.vOgq=c|{eXZU"></arg>
      <arg name="argB" varid="iPCMIxnIH8L:v8.1n[;O"></arg>
    </mutation>
    <field name="NAME">doSomething</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="text_print" id="{3`2[2NRz54$%yGj[q#X">
        <value name="TEXT">
          <shadow type="text" id="Uq6Sr_.?Js~83[}^T9Ct">
            <field name="TEXT">soicem</field>
          </shadow>
        </value>
      </block>
    </statement>
  </block>
  <block type="procedures_defnoreturn" id="G)7EH_z~3Yq5.OyLXhxR" x="238" y="163">
    <mutation>
      <arg name="argA" varid="0!CFy7c.vOgq=c|{eXZU"></arg>
      <arg name="argB" varid="iPCMIxnIH8L:v8.1n[;O"></arg>
    </mutation>
    <field name="NAME">doSomething2</field>
    <comment pinned="false" h="80" w="160">Describe this function...</comment>
    <statement name="STACK">
      <block type="text_print" id="cfl1{2hkxXW;BIFUHrPw">
        <value name="TEXT">
          <shadow type="text" id="Y[.6n=HlDnXo%r(bh4ot">
            <field name="TEXT">best in the world</field>
          </shadow>
        </value>
      </block>
    </statement>
  </block>
</xml>

2. 
<xml xmlns="http://www.w3.org/1999/xhtml">
  <block type="controls_if" id="sh!@qvU6u{pEC=TLpWVs" x="113" y="38">
    <value name="IF0">
      <block type="import_return" id="~*{}vFqE[r+ovF|I=+{P">
        <mutation func="doSomething" args="2">
          <arg name="argA"></arg>
          <arg name="argB"></arg>
        </mutation>
        <value name="ARG0">
          <block type="math_number" id="M{!jS6cBFkj^wHwjotwq">
            <field name="NUM">123</field>
          </block>
        </value>
      </block>
    </value>
    <statement name="DO0">
      <block type="import_statement" id="zxl|WF]jo1k{QU6QPp!W">
        <mutation func="doSomething2" args="2">
          <arg name="argA"></arg>
          <arg name="argB"></arg>
        </mutation>
        <value name="ARG0">
          <block type="math_number" id="on#^!X.$/ZI2[1M{yZgB">
            <field name="NUM">123</field>
          </block>
        </value>
      </block>
    </statement>
  </block>
</xml>
